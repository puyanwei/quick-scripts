import { ExtensionContext } from 'vscode'
import { createButton } from './buttons'
import { WorkspaceState } from './extension'

export async function loadInitialState(context: ExtensionContext) {
  const initialState = await getState(context)
  // Load button state(s) if there is any
  if (!!initialState && initialState !== '') {
    const workspaceState: WorkspaceState[] = await JSON.parse(initialState!)
    workspaceState.forEach(({ name, command }) => createButton(name, command))
  }
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
