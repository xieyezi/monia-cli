import Ora from 'Ora'
import shell from 'shelljs'
import fs from 'fs-extra'
import figlet from 'figlet'
import replace from 'replace'
import chalk from 'chalk'
import child_process from 'child_process'
import { COMMON_NULL_SAFETY, regDescription, regNameWithNullsafety, regVersion } from './createFlutter'

// update target file
const updateNullSafetyTargetFile = async (
	projectName: string,
	targetDir: string,
	description: string,
	version: string,
	spinner: Ora.Ora
) => {
	shell.rm('-rf', `${targetDir}/lib`)
	shell.rm('-f', `${targetDir}/pubspec.yaml`)
	shell.mv(`${targetDir}/${COMMON_NULL_SAFETY}/lib`, `${targetDir}`)
	shell.mv(`${targetDir}/${COMMON_NULL_SAFETY}/pubspec.yaml`, `${targetDir}`)
	replace({
		regex: regNameWithNullsafety,
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
	await fs.remove(`${targetDir}/${COMMON_NULL_SAFETY}`)
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

export default updateNullSafetyTargetFile
