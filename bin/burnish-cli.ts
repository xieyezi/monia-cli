import * as config from '../package.json'
import chalk from 'chalk'
import program from 'commander'
import didYouMean from 'didYouMean'
import create from '../lib/create'
import { checkNodeVersion, suggestCommands, enhanceErrorMessages } from '../lib/utils'

const requiredVersion = config.engines.node
didYouMean.threshold = 0.6

/**
 * Check node version required >=9.0
 */
checkNodeVersion(requiredVersion, '@burnish/cli')

/**
 * start create app
 */
program.version(config.version).usage('<command> [options]')
program
	.command('create <app-name>')
	.description('  Create a project with template from burnish git repository.')
	.action((name, cmd) => {
		create(name)
	})
/***
 * output help information on unknown commands
 */
program.arguments('<command>').action((cmd) => {
	program.outputHelp()
	console.log('  ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}`))
	console.log()
	suggestCommands(cmd)
})

/**
 * enhance common error messages
 */
enhanceErrorMessages('missingArgument', (argName: string) => {
	return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', (optionName: string) => {
	return `Unknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
	return (
		`Missing required argument for option ${chalk.yellow(option.flags)}` + (flag ? `, got ${chalk.yellow(flag)}` : '')
	)
})

program.parse(process.argv)
/**
 * add some useful info on help
 */
program.on('--help', () => {
	console.log()
	console.log(`  Run ${chalk.cyan('burnish-cli <command> --help')} for detailed usage of given command.`)
	console.log()
})
if (!process.argv.slice(2).length) {
	program.outputHelp()
}
