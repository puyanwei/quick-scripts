import { commands, ExtensionContext } from 'vscode'
import { addButtonScript, deleteButtonScript } from './buttonScripts'
import { resetStateScript, viewStateScript } from './debuggingHelpers'
import { getState, createButton } from './utilities'

export interface WorkspaceState {
  name: string
  command: string
}

export async function activate(context: ExtensionContext) {
  const initialState = await getState(context)
  // Load button state(s) is there is any
  if (!!initialState && initialState !== '') {
    const workspaceState: WorkspaceState[] = await JSON.parse(initialState!)
    workspaceState.forEach(({ name, command }) => createButton(name, command))
  }

  const deleteButton = commands.registerCommand('extension.deleteButton', () =>
    deleteButtonScript(context)
  )
  const addButton = commands.registerCommand('extension.addButton', () =>
    addButtonScript(context)
  )
  //debugging scripts
  const viewState = commands.registerCommand('extension.viewState', () =>
    viewStateScript(context)
  )
  const resetState = commands.registerCommand('extension.resetState', () =>
    resetStateScript(context)
  )

  context.subscriptions.push(addButton, deleteButton, viewState, resetState)
}

export function deactivate() {}
