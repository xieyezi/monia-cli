import * as vscode from 'vscode'
import { generateStatusBar } from './utils'
import generateNewGetxPage from './comands/generate'

export function activate({ subscriptions }: vscode.ExtensionContext) {
	generateStatusBar('monia-create', 'monia:create')
	generateStatusBar('monia-generate', 'monia:generate')

	const create = vscode.commands.registerCommand('monia:create', () => {})

	const generate = vscode.commands.registerCommand('monia:generate', generateNewGetxPage)

	subscriptions.push(generate)

	//TODO: 完成项目新建命令
	//subscriptions.push(create)
}

// this method is called when your extension is deactivated
export function deactivate() {}
