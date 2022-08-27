import { commands, window, ExtensionContext } from 'vscode'
import { resetStateScript, seeStateScript } from './test/debuggingHelpers'
import {
  getState,
  createButton,
  updateState,
  addSingleObjectToState,
} from './utilities'

export interface WorkspaceState {
  name: string
  command: string
}

export async function activate(context: ExtensionContext) {
  // resetState(context)

  const initialState = await getState(context)
  // Load state is there is any
  if (!!initialState && initialState !== '') {
    const workspaceState: WorkspaceState[] = await JSON.parse(initialState!)
    workspaceState.forEach(({ name, command }) => createButton(name, command))
  }

  const deleteButton = commands.registerCommand('extension.deleteButton', () =>
    deleteButtonScript(context)
  )
  const addButton = commands.registerCommand('extension.addButton', () =>
    addButtonScript()
  )
  const seeState = commands.registerCommand('extension.seeState', () =>
    seeStateScript(context)
  )
  const resetState = commands.registerCommand('extension.resetState', () =>
    resetStateScript(context)
  )

  async function addButtonScript() {
    const command = await window.showInputBox({
      prompt: 'Add in the script command you want to run in the terminal',
    })

    if (!command) return window.showErrorMessage('No command provided')

    const name = await window.showInputBox({
      prompt: 'Name of the button',
    })

    if (!name) return window.showErrorMessage('No name provided')

    await createButton(name!, command!)
    await addSingleObjectToState({ context, name, command })
    return
  }

  async function deleteButtonScript(context: ExtensionContext) {
    const currentState = await getState(context)

    if (!currentState || currentState === '[]') {
      window.showErrorMessage('No buttons to delete')
      return
    }
    const buttonNamesParsed: WorkspaceState[] = JSON.parse(currentState!)
    const buttonNames = buttonNamesParsed.map(({ name }) => name)
    const buttonSelection = await window.showQuickPick(buttonNames)
    if (!buttonSelection) return window.showErrorMessage('No button selected')

    const newState = buttonNamesParsed.filter(
      ({ name }) => name !== buttonSelection
    )
    await updateState(context, newState)

    // Update status bar items
    // statusBarItems.forEach((item) => {
    //   if (!!item.name) return
    //   if (item?.name === buttonSelection) item.hide()
    // })

    return
  }

  context.subscriptions.push(addButton, deleteButton, seeState, resetState)
}

export function deactivate() {}
