import { commands, window, ExtensionContext } from 'vscode'
import { getState, updateState, createButton, resetState } from './utilities'

interface WorkspaceState {
  name: string
  command: string
}

export async function activate(context: ExtensionContext) {
  // resetState(context)
  // context.workspaceState.update('BOB', 'EGG')

  const value = await getState(context)

  if (value || value !== '') {
    const workspaceState: WorkspaceState[] = await JSON.parse(value!)
    workspaceState.forEach(({ name, command }) => createButton(name, command))
  }

  const addButton = commands.registerCommand(
    'extension.addButton',
    async () => {
      const command = await window.showInputBox({
        prompt: 'Add in the script command you want to run in the terminal',
      })

      const name = await window.showInputBox({
        prompt: 'Name of the button',
      })

      await createButton(name!, command!)
      return
    }
  )
  context.subscriptions.push(addButton)
}

export function deactivate() {}
