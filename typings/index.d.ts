import { CommanderStatic } from 'commander'

declare namespace monia {
	interface MoniaCli {
		/**
		 * Check node version required >=9.0
		 */
		checkNodeVersion: (wanted: string, id: string) => void
		/**
		 * downloadFromGithub git respositories
		 */
		downloadFromGithub: (url: string, name: string) => Promise<void>
		/**
		 * enhanceErrorMessages for  monia@cli
		 */
		enhanceErrorMessages: (program: CommanderStatic, methodName: string, log: any) => void
		/**
		 * suggestCommands for  monia@cli
		 */
		suggestCommands: (program: CommanderStatic, cmd: any) => void
		/**
		 * createApp
		 */
		createApp: (projectName: string) => Promise<void>
		/**
		 * createVueApp
		 */
		createVueApp: (projectName: string, targetDir: string) => Promise<void>
		/**
		 * createReactApp
		 */

		createReactApp: (projectName: string, targetDir: string) => Promise<void>
		/**
		 * createFlutterApp
		 */
		createFlutterApp: (projectName: string, targetDir: string) => Promise<void>
	}
}
declare const moniaCli: monia.MoniaCli
export = moniaCli
