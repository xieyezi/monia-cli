import fs from 'fs-extra'
import replace from 'replace'
import path from 'path'
import { COMMON_NULL_SAFETY, COMMON_WITHOUT_NULL_SAFETY } from './createFlutter'

// trave template and replace projectName
const targetFileDisplayReplace = (projectName: string, flutterVersion: string, filePath: string) => {
	const files = fs.readdirSync(filePath, 'utf-8')
	files.forEach(function(filename) {
		let filedir = path.join(filePath, filename)
		if (fs.statSync(filedir).isFile() && filedir.includes('.dart')) {
			console.log(`generate ${filedir}`)
			replace({
				regex: flutterVersion === 'null-safety' ? COMMON_NULL_SAFETY : COMMON_WITHOUT_NULL_SAFETY,
				replacement: projectName,
				paths: [filedir],
				recursive: true,
				silent: true
			})
		} else {
			if (fs.statSync(filedir).isDirectory()) targetFileDisplayReplace(projectName, flutterVersion, filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
		}
	})
}

export default targetFileDisplayReplace
