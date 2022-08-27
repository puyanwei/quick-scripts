import { window, StatusBarAlignment, ExtensionContext } from 'vscode'
import { WorkspaceState } from './extension'

export function createButton(name: string, command: string) {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.text = name
  statusBar.command = `workbench.action.terminal.new`
  statusBar.tooltip = name
  statusBar.show()
  window.onDidOpenTerminal((terminal) => terminal.sendText(command!))
  return statusBar
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

interface AddSingleObjectToState {
  context: ExtensionContext
  name: string
  command: string
}
export async function addSingleObjectToState({
  context,
  name,
  command,
}: AddSingleObjectToState) {
  const newValue = [{ name, command }]
  const currentValue = (await getState(context)) || null

  const value = !!currentValue
    ? [...JSON.parse(currentValue), ...newValue]
    : [...newValue] // If is first button added

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
