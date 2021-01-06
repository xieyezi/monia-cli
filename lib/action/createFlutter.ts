import Ora from 'Ora'
import path from 'path'
import chalk from 'chalk'
import shell from 'shelljs'
import fs from 'fs-extra'
import figlet from 'figlet'
import replace from 'replace'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import child_process from 'child_process'

import { downloadFromGithub } from '../utils'
import REMOTE_URL from '../value'

export const COMMON = 'fluttertemplate'
const regName = 'name: fluttertemplate'
const regDescription = 'description: A new Flutter project.'
const regVersion = 'version: 1.0.0+1'

const createFlutterApp = async (projectName: string, targetDir: string) => {
	try {
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
		// 一些提示 ···
		console.log(chalk.white(`\n\n✨  Creating project in ${chalk.yellow(targetDir)}.`))
		console.log(chalk.white(`\n🗃  Initializing git repository....\n`))
		child_process.execSync(`flutter create ${projectName}`, { stdio: [0, 1], windowsHide: true })
		// 切换当前目录到目标文件夹
		process.chdir(`./${projectName}`)
		const spinner = Ora({
			text: `Download template from monia git repository... This might take a while....\n`
		})
		// spinner.start()
		await downloadFromGithub(REMOTE_URL.FLUTTER, COMMON).catch((err) => {
			console.log(logSymbols.error, err)
			spinner.fail(chalk.red('Sorry, it must be something error,please check it out. \n'))
			process.exit(-1)
		})
		targetFileDisplayReplace(projectName, `${targetDir}/${COMMON}`)
		updateTargetFile(projectName, targetDir, description, version, spinner)
	} catch (error) {
		console.log(error)
	}
}
// trave template and replace projectName
const targetFileDisplayReplace = (projectName: string, filePath: string) => {
	const files = fs.readdirSync(filePath, 'utf-8')
	files.forEach(function(filename) {
		let filedir = path.join(filePath, filename)
		if (fs.statSync(filedir).isFile() && filedir.includes('.dart')) {
			console.log(`generate ${filedir}`)
			replace({
				regex: COMMON,
				replacement: projectName,
				paths: [filedir],
				recursive: true,
				silent: true
			})
		} else {
			if (fs.statSync(filedir).isDirectory()) targetFileDisplayReplace(projectName, filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
		}
	})
}

// update target file
const updateTargetFile = async (
	projectName: string,
	targetDir: string,
	description: string,
	version: string,
	spinner: Ora.Ora
) => {
	shell.rm('-rf', `${targetDir}/lib`)
	shell.rm('-f', `${targetDir}/pubspec.yaml`)
	shell.mv(`${targetDir}/${COMMON}/lib`, `${targetDir}`)
	shell.mv(`${targetDir}/${COMMON}/pubspec.yaml`, `${targetDir}`)
	replace({
		regex: regName,
		replacement: `name: ${projectName}`,
		paths: [`${targetDir}/pubspec.yaml`],
		recursive: true,
		silent: true
	})
	replace({
		regex: regDescription,
		replacement: `description: ${description}.`,
		paths: [`${targetDir}/pubspec.yaml`],
		recursive: true,
		silent: true
	})
	replace({
		regex: regVersion,
		replacement: `version: ${version}`,
		paths: [`${targetDir}/pubspec.yaml`],
		recursive: true,
		silent: true
	})
	await fs.remove(`${targetDir}/${COMMON}`)
	child_process.execSync('flutter pub get', { stdio: [0, 1], windowsHide: true })
	spinner.stop()
	// 依赖安装完成之后给出提示信息
	console.log(chalk.white(`\n🎉  Successfully created project`), chalk.yellow(`${projectName}.`))
	console.log(chalk.white('👉  Get started with the following commands:\n'))
	console.log(`${chalk.cyan(`${chalk.gray('$')} cd ${projectName}`)}`)
	console.log(chalk.cyan(`${chalk.gray('$')} flutter run\n\n`))
	console.log(chalk.white(figlet.textSync('monia-cli')))
	process.exit()
}

export default createFlutterApp
