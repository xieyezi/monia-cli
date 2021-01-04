const download = require('download-git-repo')
/**
 * download template from github
 */
const downloadFromGithub = (url: string, name: string) => {
	return new Promise<void>((resolve, reject) => {
		download(`direct:${url}`, name, { clone: true }, function(err) {
			if (!err) {
				resolve()
			} else {
				reject(err)
			}
		})
	})
}

export default downloadFromGithub
