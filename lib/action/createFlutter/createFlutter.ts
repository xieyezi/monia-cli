import Ora from 'Ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import child_process from 'child_process'
import { downloadFromGithub } from '../../utils'
import REMOTE_URL from '../../value'
import targetFileDisplayReplace from './targetFileDisplayReplace'
import updateNullSafetyTargetFile from './updateNullSafetyTargetFile'
import updateWithoutNullSafetyTargetFile from './updateWithoutNullSafetyTargetFile'

export const COMMON_NULL_SAFETY = 'flutter_getx_template'
export const COMMON_WITHOUT_NULL_SAFETY = 'fluttertemplate'
export const regNameWithNullsafety = 'name: flutter_getx_template'
export const regNameWihoutNullsafety = 'name: fluttertemplate'
export const regDescription = 'description: A new Flutter project.'
export const regVersion = 'version: 1.0.0+1'

const createFlutterApp = async (projectName: string, targetDir: string) => {
	try {
		const { flutterVersion } = await inquirer.prompt([
			{
				type: 'list',
				name: 'flutterVersion',
				message: 'Which flutter version do you want to create',
				default: 'null-safety',
				choices: ['null-safety', 'without-null-safety'],
				validate(val) {
					return true
				}
			}
		])
		const { description, version } = await inquirer.prompt([
			{
				type: 'input',
				name: 'description',
				message: 'Please input your project description',
				default: 'description',
				validate(val) {
					return true
				}
			},
			{
				type: 'input',
				name: 'version',
				message: 'Please input project version',
				default: '1.0.0',
				validate(val) {
					return true
				},
				transformer(val) {
					return val
				}
			}
		])

		console.log(chalk.white(`\n\n✨  Creating project in ${chalk.yellow(targetDir)}.`))
		console.log(chalk.white(`\n🗃  Initializing git repository....\n`))
		child_process.execSync(`flutter create ${projectName}`, { stdio: [0, 1], windowsHide: true })

		// 切换当前目录到目标文件夹
		process.chdir(`./${projectName}`)

		const spinner = Ora({
			text: `Download template from monia git repository... This might take a while....\n`
		})
		spinner.start()

		const remoteUrl =
			flutterVersion === 'null-safety' ? REMOTE_URL.FLUTTER_NULL_SAFETY : REMOTE_URL.FLUTTER_WITHOUT_NULL_SAFETY

		const templateName = flutterVersion === 'null-safety' ? COMMON_NULL_SAFETY : COMMON_WITHOUT_NULL_SAFETY

		await downloadFromGithub(remoteUrl, templateName).catch((err) => {
			console.log(logSymbols.error, err)
			spinner.fail(chalk.red('Sorry, it may be network error,please check it out. \n'))
			process.exit(-1)
		})

		targetFileDisplayReplace(projectName, flutterVersion, `${targetDir}/${templateName}`)
		// 根据不同版本进行不同的操作
		if (flutterVersion === 'null-safety')
			updateNullSafetyTargetFile(projectName, targetDir, description, version, spinner)
		else updateWithoutNullSafetyTargetFile(projectName, targetDir, description, version, spinner)
	} catch (error) {
		console.log(error)
	}
}

export default createFlutterApp
