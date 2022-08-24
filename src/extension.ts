import { commands, window, ExtensionContext } from 'vscode'
import { getState, updateState, createButton, resetState } from './utilities'

interface WorkspaceState {
  name: string
  command: string
}

export async function activate(context: ExtensionContext) {
  // resetState(context)

  const initialState = await getState(context)

  if (!!initialState && initialState !== '') {
    const workspaceState: WorkspaceState[] = await JSON.parse(initialState!)
    workspaceState.forEach(({ name, command }) => createButton(name, command))
  }

  const quickScripts = commands.registerCommand(
    'extension.quickScripts',
    async () => {
      const command = await window.showInputBox({
        prompt: 'Add in the script command you want to run in the terminal',
      })

      if (!command) {
        window.showErrorMessage('No command provided')
        return
      }
      const name = await window.showInputBox({
        prompt: 'Name of the button',
      })

      if (!name) {
        window.showErrorMessage('No name provided')
        return
      }
      await createButton(name!, command!)
      await updateState(context, name, command)
      return
    }
  )
  context.subscriptions.push(quickScripts)
}

export function deactivate() {}
