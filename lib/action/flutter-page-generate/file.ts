import fs from 'fs-extra'

const makeDirSync = (driName: string) => {
	try {
		fs.mkdirSync(driName)
		console.log(`generate ${driName} lib success...`)
	} catch (err) {
		console.error(err)
	}
}

const writeFileSync = (filePath: string, fileContent: string) => {
	try {
		fs.writeFileSync(filePath, fileContent)
		console.log(`generate ${filePath} success...`)
	} catch (err) {
		console.error(err)
	}
}

export { makeDirSync, writeFileSync }
