import chalk from 'chalk'
import didYouMean from 'didYouMean'
import { CommanderStatic } from 'commander'

const suggestCommands = (program: CommanderStatic, cmd) => {
	const availableCommands = program.commands.map((cmd) => {
		return cmd._name
	})
	const suggestion = didYouMean(cmd, availableCommands)
	if (suggestion) {
		console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
	}
}

export default suggestCommands
