import { window } from 'vscode'

export function createTerminalScript(...args: string[]) {
  const [name, command] = args
  console.log({ name, command })
  if (!name) {
    console.warn('No name provided')
    return
  }
  if (!command) {
    console.warn('No command provided')
    return
  }
  const terminal = window.createTerminal(name)
  terminal.show(false)
  terminal.sendText(command)
}

export async function nameInput() {
  const input = await window.showInputBox({
    prompt: 'Add the name of the button (max 5 characters)',
  })

  if (!input) {
    window.showErrorMessage('No name provided')
    return
  }
  if (input.length! > 5) {
    window.showErrorMessage('Name is too long')
    nameInput()
  }
  if (input.length < 6) return input
  return
}
