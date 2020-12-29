import chalk from 'chalk'
import semver from 'semver'

const checkNodeVersion = (wanted: string, id: string) => {
	if (!semver.satisfies(process.version, wanted)) {
		console.log(
			chalk.red(
				'You are using Node ' +
					process.version +
					', but this version of ' +
					id +
					' requires Node ' +
					wanted +
					'.\nPlease upgrade your Node version.'
			)
		)
		process.exit(1)
	}
}

export default checkNodeVersion
