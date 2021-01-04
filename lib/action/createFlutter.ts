import Ora from 'Ora'
import path from 'path'
import chalk from 'chalk'
import shell from 'shelljs'
import fs from 'fs-extra'
import figlet from 'figlet'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import child_process from 'child_process'
import { downloadFromGithub } from '../utils'
import REMOTE_URL from '../value'

export const COMMON = 'fluttertemplate'
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
		process.chdir(`./${projectName}`)
		// 切换当前目录到目标文件夹
		console.log('111111111')
		const spinner = Ora({
			text: `Download template from burnish git repository... This might take a while....\n`
		})
		spinner.start()
		downloadFromGithub(REMOTE_URL.FLUTTER, COMMON)
			.then((res) => {
				updateTargetFile(targetDir, spinner, description, version)
			})
			.catch((err) => {
				console.log(err)
				if (fs.existsSync(`${targetDir}/${COMMON}`)) {
					updateTargetFile(targetDir, spinner, description, version)
				} else {
					console.log(logSymbols.error, err)
					spinner.fail(chalk.red('Sorry, it must be something error,please check it out. \n'))
					process.exit(-1)
				}
			})
	} catch (error) {
		console.log(error)
	}
}

// update target file
const updateTargetFile = (targetDir: string, spinner: Ora.Ora, description: string, version: string) => {
	shell.rm('-f', './pubspec.yaml')
	shell.rm('-rf', './lib')
	console.log('2222222')
	shell.mv(`${targetDir}/${COMMON}/lib`, `${targetDir}`)
	shell.mv(`${targetDir}/${COMMON}/pubspec.yaml`, `${targetDir}`)
	fs.readFile('./pubspec.yaml', 'utf8', function(err, data) {
		if (err) {
			spinner.stop()
			console.error(err)
			return
		}
		let fileContent = data
		fileContent = fileContent.replace(regVersion, `version: ${version}`)
		fileContent = fileContent.replace(regDescription, `description: ${description}.`)
		fs.writeFile(`./pubspec.yaml`, fileContent, 'utf8', function(err) {
			if (err) {
				console.error(err)
			} else {
				targetFileDisplayReplace('./lib')
				spinner.stop()
				console.log('end.....')
			}
			process.exit()
		})
	})
}

const targetFileDisplayReplace = (filePath: string) => {
	console.log(filePath)
	//根据文件路径读取文件，返回文件列表
	fs.readdir(filePath, 'utf8', function(err, files) {
		if (err) {
			console.error(err)
		} else {
			console.log(files)
			files.forEach(function(filename) {
				//获取当前文件的绝对路径
				let filedir = path.join(filePath, filename)
				//根据文件路径获取文件信息，返回一个fs.Stats对象
				fs.stat(filedir, function(eror, stats) {
					if (eror) {
						console.warn('获取文件stats失败')
					} else {
						let isFile = stats.isFile() //是文件
						let isDir = stats.isDirectory() //是文件夹
						if (isFile) {
							console.log(filedir)
						}
						if (isDir) {
							targetFileDisplayReplace(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
						}
					}
				})
			})
		}
	})
}

export default createFlutterApp
