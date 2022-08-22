import { window, StatusBarAlignment, ExtensionContext } from 'vscode'

export function createButton(name: string, command: string): void {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.text = name
  statusBar.command = `workbench.action.terminal.new`
  statusBar.tooltip = name
  statusBar.show()
  window.onDidOpenTerminal((terminal) => terminal.sendText(command!))
}

export function isObjectEmpty(obj: any): boolean {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
}
export async function getState(
  context: ExtensionContext
): Promise<string | undefined> {
  const value: string | undefined = await context.workspaceState.get('BOB')
  return value
}
export async function updateState(
  context: ExtensionContext,
  value: string
): Promise<void> {
  await context.workspaceState.update('BOB', value)
  return
}
export async function resetState(context: ExtensionContext): Promise<void> {
  await updateState(context, '')
  return
}
