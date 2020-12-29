import chalk from 'chalk'
import { CommanderStatic } from 'commander'

const enhanceErrorMessages = (program: CommanderStatic, methodName: string, log: (...args: any[]) => void) => {
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
