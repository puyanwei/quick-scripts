import { window, ExtensionContext, commands, StatusBarAlignment } from 'vscode'
import { resetStateScript } from './helpers'
import { WorkspaceState } from './extension'
import { getState, addSingleObjectToState, updateState } from './state'
import { nameInput } from './terminal'

export function createButton(name: string, command: string) {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.text = name
  statusBar.command = {
    title: name,
    command: `extension.createTerminal`,
    arguments: [name, command],
  }
  statusBar.tooltip = command
  statusBar.show()
  return statusBar
}

export async function addButtonScript(context: ExtensionContext) {
  const command = await window.showInputBox({
    prompt: 'Add in the script command you want to run in the terminal',
  })
  if (!command) return window.showErrorMessage('No command provided')

  const name = await nameInput()
  if (!name) return

  await createButton(name!, command!)
  await addSingleObjectToState({ context, name, command })
  return
}

export async function deleteButtonScript(context: ExtensionContext) {
  const currentState = await getState(context)

  if (!currentState || currentState === '[]') {
    window.showErrorMessage('No buttons to delete')
    return
  }
  const buttonNamesParsed: WorkspaceState[] = JSON.parse(currentState!)
  const buttonNames = buttonNamesParsed.map(({ name }) => name)

  const buttonSelection = await window.showQuickPick(
    [...buttonNames, `Delete all`],
    { title: 'Choose a button to delete. Warning: this will reload the window' }
  )
  if (!buttonSelection) return window.showErrorMessage('No button selected')
  if (buttonSelection === 'Delete all') resetStateScript(context)
  if (buttonSelection !== 'Delete all') {
    const newState = buttonNamesParsed.filter(
      ({ name }) => name !== buttonSelection
    )
    await updateState(context, newState)
  }
  commands.executeCommand('workbench.action.reloadWindow')
  return
}
