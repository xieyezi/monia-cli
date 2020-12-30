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

const createFlutterApp = (projectName: string, targetDir: string) => {
	try {
		child_process.execSync(`flutter create ${projectName}`, { stdio: [0, 1] })
	} catch (error) {
		console.log(error)
	}
}
export default createFlutterApp
