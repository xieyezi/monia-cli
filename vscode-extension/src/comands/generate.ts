import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import { pageView, pageController, pageBindings, pageModel } from '../template'
import { promptForPageName, toBottomLine, makeDirSync, writeFileSync } from '../utils'

export default async function generateNewGetxPage() {
	const pageName = await promptForPageName()
	if (!pageName || pageName === '') {
		vscode.window.showErrorMessage('The name must not be empty')
		return
	}

	const pageLineName = toBottomLine(pageName)
	const targetDirectory = vscode.workspace.rootPath
	const pageLibIsExist = fs.existsSync(`${targetDirectory}/lib/pages`)
	if (!pageLibIsExist) {
		vscode.window.showErrorMessage(`The ${targetDirectory}/lib/pages lib must not be empty`)
		return
	}
	const targetPageLib = `${targetDirectory}/lib/pages/${pageLineName}`
	// 创建目录
	makeDirSync(targetPageLib)
	const pageViewContent = pageView(pageName)
	const pageControllerContent = pageController(pageName)
	const pageBindingsContent = pageBindings(pageName)
	const pageModelContent = pageModel()
	// 写入文件内容
	writeFileSync(`${targetPageLib}/${pageLineName}_view.dart`, pageViewContent)
	writeFileSync(`${targetPageLib}/${pageLineName}_controller.dart`, pageControllerContent)
	writeFileSync(`${targetPageLib}/${pageLineName}_binding.dart`, pageBindingsContent)
	writeFileSync(`${targetPageLib}/${pageLineName}_model.dart`, pageModelContent)

	// console.log(chalk.white(`\n🎉  Successfully generate page`), chalk.yellow(`${pageName}.`))
	vscode.window.showInformationMessage(`🎉 Successfully generate page ${pageName}.`)
}
