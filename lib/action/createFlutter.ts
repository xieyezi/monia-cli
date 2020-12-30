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
const COMMON = 'burnish_temp'
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
		child_process.execSync(`flutter create ${projectName}`, { stdio: [0, 1], windowsHide: true })
		process.chdir(`./${projectName}`)
		const spinner = Ora({
			text: `Download template from burnish git repository... This might take a while....\n`
		})
		downloadFromGithub(REMOTE_URL.FLUTTER, COMMON).then((res) => {
			fs.readFile(`./pubspec.yaml`, 'utf8', function(err, data) {
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
						// console.log(chalk.white(`📦  Installing additional dependencies...\n`))
						console.log('write success!')
					}
					process.exit()
				})
			})
		})
	} catch (error) {
		console.log(error)
	}
}
export default createFlutterApp
