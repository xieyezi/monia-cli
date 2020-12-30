import Ora from 'Ora'
import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'
import child_process from 'child_process'
import { downloadFromGithub } from '../utils'
import REMOTE_URL from '../value'

const createReactApp = async (projectName: string, targetDir: string) => {
	const { author, description, version, package_manager } = await inquirer.prompt([
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
			name: 'author',
			message: 'Please input your author name',
			default: 'author',
			validate(val) {
				return true
			},
			transformer(val) {
				return val
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
		},
		{
			type: 'list',
			name: 'package_manager',
			message: 'Which package manager do you want to use',
			default: 'Yarn',
			choices: ['Yarn', 'Npm'],
			validate(val) {
				return true
			}
		}
	])
	// 一些提示 ···
	console.log(chalk.white(`\n\n✨  Creating project in ${chalk.yellow(targetDir)}.`))
	console.log(chalk.white(`\n🗃  Initializing git repository....\n`))
	const spinner = Ora({
		text: `Download template from burnish git repository... This might take a while....\n`
	})
	spinner.start()
	downloadFromGithub(REMOTE_URL.REACT, projectName)
		.then((res) => {
			fs.readFile(`./${projectName}/package.json`, 'utf8', function(err, data) {
				if (err) {
					spinner.stop()
					console.error(err)
					return
				}
				const packageJson = JSON.parse(data)
				packageJson.name = projectName
				packageJson.description = description
				packageJson.author = author
				packageJson.version = version
				var updatePackageJson = JSON.stringify(packageJson, null, 2)
				fs.writeFile(`./${projectName}/package.json`, updatePackageJson, 'utf8', function(err) {
					spinner.stop()
					if (err) {
						console.error(err)
					} else {
						console.log(chalk.white(`📦  Installing additional dependencies...\n`))
						// 将node工作目录更改成构建的项目根目录下
						process.chdir(`./${projectName}`)
						// 安装项目依赖
						if (package_manager === 'Yarn') {
							child_process.execSync('yarn', { stdio: [0, 1] })
						} else {
							child_process.execSync('npm install', { stdio: [0] })
						}
						// 依赖安装完成之后给出提示信息
						console.log(chalk.white(`\n🎉  Successfully created project`), chalk.yellow(`${projectName}.`))
						console.log(chalk.white('👉  Get started with the following commands:\n'))
						console.log(`${chalk.cyan(`${chalk.gray('$')} cd ${projectName}`)}`)
						console.log(
							package_manager === 'Yarn'
								? chalk.cyan(`${chalk.gray('$')} yarn start\n\n`)
								: chalk.cyan(`${chalk.gray('$')} npm run start\n\n`)
						)
						console.log(chalk.white(figlet.textSync('brnish-cli')))
					}
					process.exit()
				})
			})
		})
		.catch((err) => {
			console.log(logSymbols.error, err)
			spinner.fail(chalk.red('Sorry, it must be something error,please check it out. \n'))
			process.exit(-1)
		})
}
export default createReactApp
