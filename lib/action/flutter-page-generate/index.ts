import Ora from 'Ora'
import path from 'path'
import chalk from 'chalk'
import { makeDirSync, writeFileSync } from './file'
import { toBottomLine } from './formatName'
import { pageView, pageController, pageBindings, pageModel } from './template'

const flutterPageGenerate = async (pageName: string) => {
	try {
		const cwd = process.cwd()
		const pageLineName = toBottomLine(pageName)
		const targetDir = path.resolve(cwd, pageLineName)

		console.log(chalk.white(`✨  Generate page in ${chalk.yellow(targetDir)}.`))
		const spinner = Ora({
			text: `Generating, it's will not be wait long...\n`
		})
		spinner.start()

		const pageViewContent = pageView(pageName)
		const pageControllerContent = pageController(pageName)
		const pageBindingsContent = pageBindings(pageName)
		const pageModelContent = pageModel()

		makeDirSync(pageLineName)
		writeFileSync(`${targetDir}/${pageLineName}_view.dart`, pageViewContent)
		writeFileSync(`${targetDir}/${pageLineName}_controller.dart`, pageControllerContent)
		writeFileSync(`${targetDir}/${pageLineName}_binding.dart`, pageBindingsContent)
		writeFileSync(`${targetDir}/${pageLineName}_model.dart`, pageModelContent)

		spinner.stop()
		console.log(chalk.white(`\n🎉  Successfully generate page`), chalk.yellow(`${pageName}.`))
	} catch (error) {
		console.log(error)
	}
}

export default flutterPageGenerate
