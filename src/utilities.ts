import { window, StatusBarAlignment, ExtensionContext } from 'vscode'
import { WorkspaceState } from './extension'

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
  const value: string | undefined = await context.workspaceState.get('qsState')
  return value
}
export async function addSingleState(
  context: ExtensionContext,
  name: string,
  command: string
): Promise<void> {
  const newValue = [{ name, command }]
  const currentValue = (await getState(context)) || null

  const value = !!currentValue
    ? [...JSON.parse(currentValue), ...newValue]
    : [...newValue]
  await context.workspaceState.update('qsState', JSON.stringify(value))
  return
}

export async function updateState(
  context: ExtensionContext,
  state: WorkspaceState[]
) {
  context.workspaceState.update('qsState', JSON.stringify(state))
  return
}

export async function resetState(context: ExtensionContext): Promise<void> {
  await context.workspaceState.update('qsState', '')
  return
}
