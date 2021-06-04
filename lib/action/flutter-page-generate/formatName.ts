// 转为大驼峰
const toBigHump = (str: string) => {
	let resStr = str
	if (str.includes('_')) {
		const strArr = str.split('_')
		for (let i = 1; i < strArr.length; i++) {
			strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
		}
		resStr = strArr.join('')
	}
	if (/[a-z]/.test(resStr[0])) resStr = resStr[0].toUpperCase() + resStr.substr(1)
	return resStr
}

// 转为下划线
const toBottomLine = (str: string) => {
	let orginStr = str
	if (/[A-Z]/.test(str[0])) {
		orginStr = str[0].toLowerCase() + orginStr.substr(1)
	}
	return orginStr.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export { toBigHump, toBottomLine }
