import chalk from 'chalk'
import fs from 'fs-extra'

const makeDirSync = (driName: string) => {
	try {
		fs.mkdirSync(driName)
		console.log(chalk.white(`generate`), chalk.yellow(`${driName} lib success.`))
	} catch (err) {
		console.error(err)
	}
}

const writeFileSync = (filePath: string, fileContent: string) => {
	try {
		fs.writeFileSync(filePath, fileContent)
		console.log(chalk.white(`generate`), chalk.yellow(`${filePath} file success.`))
	} catch (err) {
		console.error(err)
	}
}

export { makeDirSync, writeFileSync }
