import { commands, ExtensionContext, StatusBarAlignment, window } from 'vscode'

export async function activate(context: ExtensionContext) {
  console.log('Congratulations, your extension "quick scripts" is now active!')
  let disposable = commands.registerCommand('button.quickScripts', async () => {
    window.showInformationMessage('Hello World the quick scripts!')
    // resetState(context)
    if (
      (await getState(context)) === undefined ||
      (await getState(context)) === ''
    ) {
      const firstEgg = JSON.stringify(['🥚'])
      await updateState(context, firstEgg)
      makeButton('🥚')
    } else {
      const value = await getState(context)
      if (!value) throw new Error('No value found')
      console.log({ value })

      const array: string[] = await JSON.parse(value)
      const eggArray = [...array, '🥚']
      const finalArray = await JSON.stringify(eggArray)
      await updateState(context, finalArray)
      eggArray.forEach((element, index) => makeButton(`🥚 ${index + 1}`))
    }
  })
  context.subscriptions.push(disposable)
}

async function makeButton(name: string) {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 0)
  statusBar.text = name
  statusBar.command = `workbench.action.terminal.new`
  statusBar.tooltip = name
  statusBar.show()
}

function isObjectEmpty(obj: any): boolean {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
}

async function getState(
  context: ExtensionContext
): Promise<string | undefined> {
  const value: string | undefined = await context.workspaceState.get('BOB')
  return value
}

async function updateState(
  context: ExtensionContext,
  value: string
): Promise<void> {
  await context.workspaceState.update('BOB', value)
  return
}

async function resetState(context: ExtensionContext): Promise<void> {
  await updateState(context, '')
  return
}

export function deactivate() {}
