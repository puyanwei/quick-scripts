import { ExtensionContext } from 'vscode'
import { getState } from './utilities'

export async function seeStateScript(context: ExtensionContext) {
  const state = await getState(context)
  console.warn({ state })
  return
}

export async function resetStateScript(
  context: ExtensionContext
): Promise<void> {
  await context.workspaceState.update('qsState', '')
  return
}
