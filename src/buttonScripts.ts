import { window, ExtensionContext } from 'vscode'
import { WorkspaceState } from './extension'
import {
  createButton,
  addSingleObjectToState,
  getState,
  updateState,
} from './utilities'

export async function addButtonScript(context: ExtensionContext) {
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

export async function deleteButtonScript(context: ExtensionContext) {
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
