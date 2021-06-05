import * as vscode from 'vscode'
import * as fs from 'fs-extra'
import { InputBoxOptions, window } from 'vscode'

// 生成状态栏
const generateStatusBar = (text: string, command: string) => {
	const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
	button.text = text
	button.command = command
	button.show()
}

// 输入pageName
const promptForPageName = (): Thenable<string | undefined> => {
	const namePromptOptions: InputBoxOptions = {
		prompt: 'Input Page Name'
	}
	return window.showInputBox(namePromptOptions)
}

// 转为大驼峰
const toBigHump = (str: string) => {
	let resStr = str
	if (str.includes('_')) {
		const strArr = str.split('_')
		for (let i = 1; i < strArr.length; i++) {
			strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
		}
		resStr = strArr.join('')
	}
	if (/[a-z]/.test(resStr[0])) resStr = resStr[0].toUpperCase() + resStr.substr(1)
	return resStr
}

// 转为下划线
const toBottomLine = (str: string) => {
	let orginStr = str
	if (/[A-Z]/.test(str[0])) {
		orginStr = str[0].toLowerCase() + orginStr.substr(1)
	}
	return orginStr.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 创建文件夹
const makeDirSync = (driName: string) => {
	try {
		fs.mkdirSync(driName)
	} catch (err) {
		console.error(err)
	}
}

// 写入文件
const writeFileSync = (filePath: string, fileContent: string) => {
	try {
		fs.writeFileSync(filePath, fileContent)
	} catch (err) {
		console.error(err)
	}
}

export { generateStatusBar, promptForPageName, toBigHump, toBottomLine, makeDirSync, writeFileSync }
