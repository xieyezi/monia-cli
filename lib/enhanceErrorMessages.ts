const program = require('commander')
const chalk = require('chalk')

const enhanceErrorMessages =  (methodName, log) => {
	program.Command.prototype[methodName] = function(...args) {
		if (methodName === 'unknownOption' && this._allowUnknownOption) {
			return
		}
		this.outputHelp()
		console.log('  ' + chalk.red(log(...args)))
		console.log()
		process.exit(1)
	}
}
export default enhanceErrorMessages