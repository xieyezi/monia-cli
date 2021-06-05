import * as vscode from 'vscode'
import { generateStatusBar } from './utils'
import generateNewGetxPage from './comands/generate'

export function activate({ subscriptions }: vscode.ExtensionContext) {
	generateStatusBar('monia-generate', 'monia:generate')
	const generate = vscode.commands.registerCommand('monia:generate', generateNewGetxPage)
	subscriptions.push(generate)

	//TODO: 完成项目新建命令
	// generateStatusBar('monia-create', 'monia:create')
	// const create = vscode.commands.registerCommand('monia:create', () => {})
	//subscriptions.push(create)
}

// this method is called when your extension is deactivated
export function deactivate() {}
