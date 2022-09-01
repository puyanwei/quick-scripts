import { window, ExtensionContext } from 'vscode'
import { WorkspaceState } from './extension'

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
