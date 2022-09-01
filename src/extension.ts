import { commands, ExtensionContext } from 'vscode'
import {
  addButtonScript,
  deleteButtonScript,
  loadInitialState,
} from './buttonScripts'
import { resetStateScript, viewStateScript } from './debuggingHelpers'
import { createTerminalScript } from './utilities'

export interface WorkspaceState {
  name: string
  command: string
}

export async function activate(context: ExtensionContext) {
  await loadInitialState(context)

  const deleteButton = commands.registerCommand('extension.deleteButton', () =>
    deleteButtonScript(context)
  )
  const addButton = commands.registerCommand('extension.addButton', () =>
    addButtonScript(context)
  )

  const createTerminal = commands.registerCommand(
    'extension.createTerminal',
    (...args) => createTerminalScript(...args)
  )
  //debugging scripts
  const viewState = commands.registerCommand('extension.viewState', () =>
    viewStateScript(context)
  )
  const resetState = commands.registerCommand('extension.resetState', () =>
    resetStateScript(context)
  )

  context.subscriptions.push(
    addButton,
    deleteButton,
    viewState,
    resetState,
    createTerminal
  )
}

export function deactivate() {}
