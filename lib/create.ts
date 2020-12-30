import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { createVueApp, createReactApp, createFlutterApp } from './action'

const createApp = async (projectName: string) => {
	const cwd = process.cwd()
	const targetDir = path.resolve(cwd, projectName)
	const name = path.relative(cwd, projectName)
	// check projectName is Exist
	if (fs.existsSync(targetDir)) {
		const { action } = await inquirer.prompt([
			{
				name: 'action',
				type: 'list',
				message: `Target directory ${chalk.cyan(targetDir)} already exists. choose an action:`,
				choices: [
					{ name: 'Overwrite', value: 'overwrite' },
					{ name: 'Cancel', value: false }
				]
			}
		])
		if (!action) {
			return
		} else if (action === 'overwrite') {
			console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
			await fs.remove(targetDir)
		}
	}
	const { framework } = await inquirer.prompt([
		{
			type: 'list',
			name: 'framework',
			message: 'Which framework do you want to create',
			default: 'Vue',
			choices: ['Vue', 'React', 'Flutter'],
			validate(val) {
				return true
			}
		}
	])
	switch (framework) {
		case 'Vue':
			createVueApp(name, targetDir)
			break
		case 'React':
			createReactApp(name, targetDir)
			break
		case 'Flutter':
			createFlutterApp(name, targetDir)
			break
		default:
			break
	}
}
export default createApp
