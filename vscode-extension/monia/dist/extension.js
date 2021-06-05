/******/ ;(() => {
	// webpackBootstrap
	/******/ var __webpack_modules__ = [
		,
		/* 0 */ /* 1 */
		/***/ (module) => {
			'use strict'
			module.exports = require('vscode')

			/***/
		},
		/* 2 */
		/***/ (__unused_webpack_module, exports, __webpack_require__) => {
			'use strict'

			Object.defineProperty(exports, '__esModule', { value: true })
			exports.writeFileSync = exports.makeDirSync = exports.toBottomLine = exports.toBigHump = exports.promptForPageName = exports.generateStatusBar = void 0
			const vscode = __webpack_require__(1)
			const fs = __webpack_require__(16)
			const vscode_1 = __webpack_require__(1)
			// 生成状态栏
			const generateStatusBar = (text, command) => {
				const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
				button.text = text
				button.command = command
				button.show()
			}
			exports.generateStatusBar = generateStatusBar
			// 输入pageName
			const promptForPageName = () => {
				const namePromptOptions = {
					prompt: 'Input Page Name'
				}
				return vscode_1.window.showInputBox(namePromptOptions)
			}
			exports.promptForPageName = promptForPageName
			// 转为大驼峰
			const toBigHump = (str) => {
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
			exports.toBigHump = toBigHump
			// 转为下划线
			const toBottomLine = (str) => {
				let orginStr = str
				if (/[A-Z]/.test(str[0])) {
					orginStr = str[0].toLowerCase() + orginStr.substr(1)
				}
				return orginStr.replace(/([A-Z])/g, '_$1').toLowerCase()
			}
			exports.toBottomLine = toBottomLine
			// 创建文件夹
			const makeDirSync = (driName) => {
				try {
					fs.mkdirSync(driName)
				} catch (err) {
					console.error(err)
				}
			}
			exports.makeDirSync = makeDirSync
			// 写入文件
			const writeFileSync = (filePath, fileContent) => {
				try {
					fs.writeFileSync(filePath, fileContent)
				} catch (err) {
					console.error(err)
				}
			}
			exports.writeFileSync = writeFileSync

			/***/
		},
		/* 3 */
		/***/ function(__unused_webpack_module, exports, __webpack_require__) {
			'use strict'

			var __awaiter =
				(this && this.__awaiter) ||
				function(thisArg, _arguments, P, generator) {
					function adopt(value) {
						return value instanceof P
							? value
							: new P(function(resolve) {
									resolve(value)
							  })
					}
					return new (P || (P = Promise))(function(resolve, reject) {
						function fulfilled(value) {
							try {
								step(generator.next(value))
							} catch (e) {
								reject(e)
							}
						}
						function rejected(value) {
							try {
								step(generator['throw'](value))
							} catch (e) {
								reject(e)
							}
						}
						function step(result) {
							result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
						}
						step((generator = generator.apply(thisArg, _arguments || [])).next())
					})
				}
			Object.defineProperty(exports, '__esModule', { value: true })
			const fs = __webpack_require__(16)
			const vscode = __webpack_require__(1)
			const template_1 = __webpack_require__(10)
			const utils_1 = __webpack_require__(2)
			function generateNewGetxPage() {
				return __awaiter(this, void 0, void 0, function*() {
					const pageName = yield utils_1.promptForPageName()
					if (!pageName || pageName === '') {
						vscode.window.showErrorMessage('The name must not be empty')
						return
					}
					const pageLineName = utils_1.toBottomLine(pageName)
					const targetDirectory = vscode.workspace.rootPath
					const pageLibIsExist = fs.existsSync(`${targetDirectory}/lib/pages`)
					if (!pageLibIsExist) {
						vscode.window.showErrorMessage(`The ${targetDirectory}/lib/pages lib must not be empty`)
						return
					}
					const targetPageLib = `${targetDirectory}/lib/pages/${pageLineName}`
					// 创建目录
					utils_1.makeDirSync(targetPageLib)
					const pageViewContent = template_1.pageView(pageName)
					const pageControllerContent = template_1.pageController(pageName)
					const pageBindingsContent = template_1.pageBindings(pageName)
					const pageModelContent = template_1.pageModel()
					// 写入文件内容
					utils_1.writeFileSync(`${targetPageLib}/${pageLineName}_view.dart`, pageViewContent)
					utils_1.writeFileSync(`${targetPageLib}/${pageLineName}_controller.dart`, pageControllerContent)
					utils_1.writeFileSync(`${targetPageLib}/${pageLineName}_binding.dart`, pageBindingsContent)
					utils_1.writeFileSync(`${targetPageLib}/${pageLineName}_model.dart`, pageModelContent)
					// console.log(chalk.white(`\n🎉  Successfully generate page`), chalk.yellow(`${pageName}.`))
				})
			}
			exports.default = generateNewGetxPage

			/***/
		},
		,
		,
		,
		,
		,
		,
		/* 4 */ /* 5 */ /* 6 */ /* 7 */ /* 8 */ /* 9 */ /* 10 */
		/***/ (__unused_webpack_module, exports, __webpack_require__) => {
			'use strict'

			Object.defineProperty(exports, '__esModule', { value: true })
			exports.pageModel = exports.pageBindings = exports.pageController = exports.pageView = void 0
			const utils_1 = __webpack_require__(2)
			const pageView = (pageName) => {
				const pageHumpName = utils_1.toBigHump(pageName)
				const pageLineName = utils_1.toBottomLine(pageName)
				return `import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '${pageLineName}_controller.dart';

class ${pageHumpName}Page extends GetView<${pageHumpName}Controller> {
    const ${pageHumpName}Page({Key? key}) : super(key: key);

    @override
    Widget build(BuildContext context) {
    return Scaffold(
        body: Container(),
    );
    }
}
`
			}
			exports.pageView = pageView
			const pageController = (pageName) => {
				const pageHumpName = utils_1.toBigHump(pageName)
				return `import 'package:get/get.dart';

class ${pageHumpName}Controller extends GetxController {
    final count = 0.obs;

    @override
    void onInit() {
    super.onInit();
    }

    @override
    void onReady() {}

    @override
    void onClose() {}

    increment() => count.value++;
}
`
			}
			exports.pageController = pageController
			const pageBindings = (pageName) => {
				const pageHumpName = utils_1.toBigHump(pageName)
				const pageLineName = utils_1.toBottomLine(pageName)
				return `import 'package:get/get.dart';
import '${pageLineName}_controller.dart';

class ${pageHumpName}Binding extends Bindings {
    @override
    void dependencies() {
    Get.lazyPut<${pageHumpName}Controller>(() => ${pageHumpName}Controller());
    }
}
`
			}
			exports.pageBindings = pageBindings
			const pageModel = () => ``
			exports.pageModel = pageModel

			/***/
		},
		/* 11 */
		/***/ (module) => {
			'use strict'
			module.exports = require('os')

			/***/
		},
		,
		,
		,
		,
		/* 12 */ /* 13 */ /* 14 */ /* 15 */ /* 16 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			module.exports = Object.assign(
				{},
				// Export promiseified graceful-fs:
				__webpack_require__(17),
				// Export extra methods:
				__webpack_require__(28),
				__webpack_require__(38),
				__webpack_require__(41),
				__webpack_require__(44),
				__webpack_require__(50),
				__webpack_require__(31),
				__webpack_require__(55),
				__webpack_require__(57),
				__webpack_require__(59),
				__webpack_require__(40),
				__webpack_require__(42)
			)

			// Export fs.promises as a getter property so that we don't trigger
			// ExperimentalWarning before fs.promises is actually accessed.
			const fs = __webpack_require__(20)
			if (Object.getOwnPropertyDescriptor(fs, 'promises')) {
				Object.defineProperty(module.exports, 'promises', {
					get() {
						return fs.promises
					}
				})
			}

			/***/
		},
		/* 17 */
		/***/ (__unused_webpack_module, exports, __webpack_require__) => {
			'use strict'

			// This is adapted from https://github.com/normalize/mz
			// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
			const u = __webpack_require__(18).fromCallback
			const fs = __webpack_require__(19)

			const api = [
				'access',
				'appendFile',
				'chmod',
				'chown',
				'close',
				'copyFile',
				'fchmod',
				'fchown',
				'fdatasync',
				'fstat',
				'fsync',
				'ftruncate',
				'futimes',
				'lchown',
				'lchmod',
				'link',
				'lstat',
				'mkdir',
				'mkdtemp',
				'open',
				'readFile',
				'readdir',
				'readlink',
				'realpath',
				'rename',
				'rmdir',
				'stat',
				'symlink',
				'truncate',
				'unlink',
				'utimes',
				'writeFile'
			].filter((key) => {
				// Some commands are not available on some systems. Ex:
				// fs.copyFile was added in Node.js v8.5.0
				// fs.mkdtemp was added in Node.js v5.10.0
				// fs.lchown is not available on at least some Linux
				return typeof fs[key] === 'function'
			})

			// Export all keys:
			Object.keys(fs).forEach((key) => {
				if (key === 'promises') {
					// fs.promises is a getter property that triggers ExperimentalWarning
					// Don't re-export it here, the getter is defined in "lib/index.js"
					return
				}
				exports[key] = fs[key]
			})

			// Universalify async methods:
			api.forEach((method) => {
				exports[method] = u(fs[method])
			})

			// We differ from mz/fs in that we still ship the old, broken, fs.exists()
			// since we are a drop-in replacement for the native module
			exports.exists = function(filename, callback) {
				if (typeof callback === 'function') {
					return fs.exists(filename, callback)
				}
				return new Promise((resolve) => {
					return fs.exists(filename, resolve)
				})
			}

			// fs.read() & fs.write need special treatment due to multiple callback args

			exports.read = function(fd, buffer, offset, length, position, callback) {
				if (typeof callback === 'function') {
					return fs.read(fd, buffer, offset, length, position, callback)
				}
				return new Promise((resolve, reject) => {
					fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
						if (err) return reject(err)
						resolve({ bytesRead, buffer })
					})
				})
			}

			// Function signature can be
			// fs.write(fd, buffer[, offset[, length[, position]]], callback)
			// OR
			// fs.write(fd, string[, position[, encoding]], callback)
			// We need to handle both cases, so we use ...args
			exports.write = function(fd, buffer, ...args) {
				if (typeof args[args.length - 1] === 'function') {
					return fs.write(fd, buffer, ...args)
				}

				return new Promise((resolve, reject) => {
					fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
						if (err) return reject(err)
						resolve({ bytesWritten, buffer })
					})
				})
			}

			// fs.realpath.native only available in Node v9.2+
			if (typeof fs.realpath.native === 'function') {
				exports.realpath.native = u(fs.realpath.native)
			}

			/***/
		},
		/* 18 */
		/***/ (__unused_webpack_module, exports) => {
			'use strict'

			exports.fromCallback = function(fn) {
				return Object.defineProperty(
					function() {
						if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)
						else {
							return new Promise((resolve, reject) => {
								arguments[arguments.length] = (err, res) => {
									if (err) return reject(err)
									resolve(res)
								}
								arguments.length++
								fn.apply(this, arguments)
							})
						}
					},
					'name',
					{ value: fn.name }
				)
			}

			exports.fromPromise = function(fn) {
				return Object.defineProperty(
					function() {
						const cb = arguments[arguments.length - 1]
						if (typeof cb !== 'function') return fn.apply(this, arguments)
						else fn.apply(this, arguments).then((r) => cb(null, r), cb)
					},
					'name',
					{ value: fn.name }
				)
			}

			/***/
		},
		/* 19 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			var fs = __webpack_require__(20)
			var polyfills = __webpack_require__(21)
			var legacy = __webpack_require__(23)
			var clone = __webpack_require__(25)

			var util = __webpack_require__(26)

			/* istanbul ignore next - node 0.x polyfill */
			var gracefulQueue
			var previousSymbol

			/* istanbul ignore else - node 0.x polyfill */
			if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
				gracefulQueue = Symbol.for('graceful-fs.queue')
				// This is used in testing by future versions
				previousSymbol = Symbol.for('graceful-fs.previous')
			} else {
				gracefulQueue = '___graceful-fs.queue'
				previousSymbol = '___graceful-fs.previous'
			}

			function noop() {}

			var debug = noop
			if (util.debuglog) debug = util.debuglog('gfs4')
			else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
				debug = function() {
					var m = util.format.apply(util, arguments)
					m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
					console.error(m)
				}

			// Once time initialization
			if (!global[gracefulQueue]) {
				// This queue can be shared by multiple loaded instances
				var queue = []
				Object.defineProperty(global, gracefulQueue, {
					get: function() {
						return queue
					}
				})

				// Patch fs.close/closeSync to shared queue version, because we need
				// to retry() whenever a close happens *anywhere* in the program.
				// This is essential when multiple graceful-fs instances are
				// in play at the same time.
				fs.close = (function(fs$close) {
					function close(fd, cb) {
						return fs$close.call(fs, fd, function(err) {
							// This function uses the graceful-fs shared queue
							if (!err) {
								retry()
							}

							if (typeof cb === 'function') cb.apply(this, arguments)
						})
					}

					Object.defineProperty(close, previousSymbol, {
						value: fs$close
					})
					return close
				})(fs.close)

				fs.closeSync = (function(fs$closeSync) {
					function closeSync(fd) {
						// This function uses the graceful-fs shared queue
						fs$closeSync.apply(fs, arguments)
						retry()
					}

					Object.defineProperty(closeSync, previousSymbol, {
						value: fs$closeSync
					})
					return closeSync
				})(fs.closeSync)

				if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
					process.on('exit', function() {
						debug(global[gracefulQueue])
						__webpack_require__(27).equal(global[gracefulQueue].length, 0)
					})
				}
			}

			module.exports = patch(clone(fs))
			if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
				module.exports = patch(fs)
				fs.__patched = true
			}

			function patch(fs) {
				// Everything that references the open() function needs to be in here
				polyfills(fs)
				fs.gracefulify = patch

				fs.createReadStream = createReadStream
				fs.createWriteStream = createWriteStream
				var fs$readFile = fs.readFile
				fs.readFile = readFile
				function readFile(path, options, cb) {
					if (typeof options === 'function') (cb = options), (options = null)

					return go$readFile(path, options, cb)

					function go$readFile(path, options, cb) {
						return fs$readFile(path, options, function(err) {
							if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readFile, [path, options, cb]])
							else {
								if (typeof cb === 'function') cb.apply(this, arguments)
								retry()
							}
						})
					}
				}

				var fs$writeFile = fs.writeFile
				fs.writeFile = writeFile
				function writeFile(path, data, options, cb) {
					if (typeof options === 'function') (cb = options), (options = null)

					return go$writeFile(path, data, options, cb)

					function go$writeFile(path, data, options, cb) {
						return fs$writeFile(path, data, options, function(err) {
							if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
								enqueue([go$writeFile, [path, data, options, cb]])
							else {
								if (typeof cb === 'function') cb.apply(this, arguments)
								retry()
							}
						})
					}
				}

				var fs$appendFile = fs.appendFile
				if (fs$appendFile) fs.appendFile = appendFile
				function appendFile(path, data, options, cb) {
					if (typeof options === 'function') (cb = options), (options = null)

					return go$appendFile(path, data, options, cb)

					function go$appendFile(path, data, options, cb) {
						return fs$appendFile(path, data, options, function(err) {
							if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
								enqueue([go$appendFile, [path, data, options, cb]])
							else {
								if (typeof cb === 'function') cb.apply(this, arguments)
								retry()
							}
						})
					}
				}

				var fs$readdir = fs.readdir
				fs.readdir = readdir
				function readdir(path, options, cb) {
					var args = [path]
					if (typeof options !== 'function') {
						args.push(options)
					} else {
						cb = options
					}
					args.push(go$readdir$cb)

					return go$readdir(args)

					function go$readdir$cb(err, files) {
						if (files && files.sort) files.sort()

						if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$readdir, [args]])
						else {
							if (typeof cb === 'function') cb.apply(this, arguments)
							retry()
						}
					}
				}

				function go$readdir(args) {
					return fs$readdir.apply(fs, args)
				}

				if (process.version.substr(0, 4) === 'v0.8') {
					var legStreams = legacy(fs)
					ReadStream = legStreams.ReadStream
					WriteStream = legStreams.WriteStream
				}

				var fs$ReadStream = fs.ReadStream
				if (fs$ReadStream) {
					ReadStream.prototype = Object.create(fs$ReadStream.prototype)
					ReadStream.prototype.open = ReadStream$open
				}

				var fs$WriteStream = fs.WriteStream
				if (fs$WriteStream) {
					WriteStream.prototype = Object.create(fs$WriteStream.prototype)
					WriteStream.prototype.open = WriteStream$open
				}

				Object.defineProperty(fs, 'ReadStream', {
					get: function() {
						return ReadStream
					},
					set: function(val) {
						ReadStream = val
					},
					enumerable: true,
					configurable: true
				})
				Object.defineProperty(fs, 'WriteStream', {
					get: function() {
						return WriteStream
					},
					set: function(val) {
						WriteStream = val
					},
					enumerable: true,
					configurable: true
				})

				// legacy names
				var FileReadStream = ReadStream
				Object.defineProperty(fs, 'FileReadStream', {
					get: function() {
						return FileReadStream
					},
					set: function(val) {
						FileReadStream = val
					},
					enumerable: true,
					configurable: true
				})
				var FileWriteStream = WriteStream
				Object.defineProperty(fs, 'FileWriteStream', {
					get: function() {
						return FileWriteStream
					},
					set: function(val) {
						FileWriteStream = val
					},
					enumerable: true,
					configurable: true
				})

				function ReadStream(path, options) {
					if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this
					else return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
				}

				function ReadStream$open() {
					var that = this
					open(that.path, that.flags, that.mode, function(err, fd) {
						if (err) {
							if (that.autoClose) that.destroy()

							that.emit('error', err)
						} else {
							that.fd = fd
							that.emit('open', fd)
							that.read()
						}
					})
				}

				function WriteStream(path, options) {
					if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this
					else return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
				}

				function WriteStream$open() {
					var that = this
					open(that.path, that.flags, that.mode, function(err, fd) {
						if (err) {
							that.destroy()
							that.emit('error', err)
						} else {
							that.fd = fd
							that.emit('open', fd)
						}
					})
				}

				function createReadStream(path, options) {
					return new fs.ReadStream(path, options)
				}

				function createWriteStream(path, options) {
					return new fs.WriteStream(path, options)
				}

				var fs$open = fs.open
				fs.open = open
				function open(path, flags, mode, cb) {
					if (typeof mode === 'function') (cb = mode), (mode = null)

					return go$open(path, flags, mode, cb)

					function go$open(path, flags, mode, cb) {
						return fs$open(path, flags, mode, function(err, fd) {
							if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) enqueue([go$open, [path, flags, mode, cb]])
							else {
								if (typeof cb === 'function') cb.apply(this, arguments)
								retry()
							}
						})
					}
				}

				return fs
			}

			function enqueue(elem) {
				debug('ENQUEUE', elem[0].name, elem[1])
				global[gracefulQueue].push(elem)
			}

			function retry() {
				var elem = global[gracefulQueue].shift()
				if (elem) {
					debug('RETRY', elem[0].name, elem[1])
					elem[0].apply(null, elem[1])
				}
			}

			/***/
		},
		/* 20 */
		/***/ (module) => {
			'use strict'
			module.exports = require('fs')

			/***/
		},
		/* 21 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			var constants = __webpack_require__(22)

			var origCwd = process.cwd
			var cwd = null

			var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

			process.cwd = function() {
				if (!cwd) cwd = origCwd.call(process)
				return cwd
			}
			try {
				process.cwd()
			} catch (er) {}

			var chdir = process.chdir
			process.chdir = function(d) {
				cwd = null
				chdir.call(process, d)
			}

			module.exports = patch

			function patch(fs) {
				// (re-)implement some things that are known busted or missing.

				// lchmod, broken prior to 0.6.2
				// back-port the fix here.
				if (constants.hasOwnProperty('O_SYMLINK') && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
					patchLchmod(fs)
				}

				// lutimes implementation, or no-op
				if (!fs.lutimes) {
					patchLutimes(fs)
				}

				// https://github.com/isaacs/node-graceful-fs/issues/4
				// Chown should not fail on einval or eperm if non-root.
				// It should not fail on enosys ever, as this just indicates
				// that a fs doesn't support the intended operation.

				fs.chown = chownFix(fs.chown)
				fs.fchown = chownFix(fs.fchown)
				fs.lchown = chownFix(fs.lchown)

				fs.chmod = chmodFix(fs.chmod)
				fs.fchmod = chmodFix(fs.fchmod)
				fs.lchmod = chmodFix(fs.lchmod)

				fs.chownSync = chownFixSync(fs.chownSync)
				fs.fchownSync = chownFixSync(fs.fchownSync)
				fs.lchownSync = chownFixSync(fs.lchownSync)

				fs.chmodSync = chmodFixSync(fs.chmodSync)
				fs.fchmodSync = chmodFixSync(fs.fchmodSync)
				fs.lchmodSync = chmodFixSync(fs.lchmodSync)

				fs.stat = statFix(fs.stat)
				fs.fstat = statFix(fs.fstat)
				fs.lstat = statFix(fs.lstat)

				fs.statSync = statFixSync(fs.statSync)
				fs.fstatSync = statFixSync(fs.fstatSync)
				fs.lstatSync = statFixSync(fs.lstatSync)

				// if lchmod/lchown do not exist, then make them no-ops
				if (!fs.lchmod) {
					fs.lchmod = function(path, mode, cb) {
						if (cb) process.nextTick(cb)
					}
					fs.lchmodSync = function() {}
				}
				if (!fs.lchown) {
					fs.lchown = function(path, uid, gid, cb) {
						if (cb) process.nextTick(cb)
					}
					fs.lchownSync = function() {}
				}

				// on Windows, A/V software can lock the directory, causing this
				// to fail with an EACCES or EPERM if the directory contains newly
				// created files.  Try again on failure, for up to 60 seconds.

				// Set the timeout this long because some Windows Anti-Virus, such as Parity
				// bit9, may lock files for up to a minute, causing npm package install
				// failures. Also, take care to yield the scheduler. Windows scheduling gives
				// CPU to a busy looping process, which can cause the program causing the lock
				// contention to be starved of CPU by node, so the contention doesn't resolve.
				if (platform === 'win32') {
					fs.rename = (function(fs$rename) {
						return function(from, to, cb) {
							var start = Date.now()
							var backoff = 0
							fs$rename(from, to, function CB(er) {
								if (er && (er.code === 'EACCES' || er.code === 'EPERM') && Date.now() - start < 60000) {
									setTimeout(function() {
										fs.stat(to, function(stater, st) {
											if (stater && stater.code === 'ENOENT') fs$rename(from, to, CB)
											else cb(er)
										})
									}, backoff)
									if (backoff < 100) backoff += 10
									return
								}
								if (cb) cb(er)
							})
						}
					})(fs.rename)
				}

				// if read() returns EAGAIN, then just try it again.
				fs.read = (function(fs$read) {
					function read(fd, buffer, offset, length, position, callback_) {
						var callback
						if (callback_ && typeof callback_ === 'function') {
							var eagCounter = 0
							callback = function(er, _, __) {
								if (er && er.code === 'EAGAIN' && eagCounter < 10) {
									eagCounter++
									return fs$read.call(fs, fd, buffer, offset, length, position, callback)
								}
								callback_.apply(this, arguments)
							}
						}
						return fs$read.call(fs, fd, buffer, offset, length, position, callback)
					}

					// This ensures `util.promisify` works as it does for native `fs.read`.
					read.__proto__ = fs$read
					return read
				})(fs.read)

				fs.readSync = (function(fs$readSync) {
					return function(fd, buffer, offset, length, position) {
						var eagCounter = 0
						while (true) {
							try {
								return fs$readSync.call(fs, fd, buffer, offset, length, position)
							} catch (er) {
								if (er.code === 'EAGAIN' && eagCounter < 10) {
									eagCounter++
									continue
								}
								throw er
							}
						}
					}
				})(fs.readSync)

				function patchLchmod(fs) {
					fs.lchmod = function(path, mode, callback) {
						fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
							if (err) {
								if (callback) callback(err)
								return
							}
							// prefer to return the chmod error, if one occurs,
							// but still try to close, and report closing errors if they occur.
							fs.fchmod(fd, mode, function(err) {
								fs.close(fd, function(err2) {
									if (callback) callback(err || err2)
								})
							})
						})
					}

					fs.lchmodSync = function(path, mode) {
						var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

						// prefer to return the chmod error, if one occurs,
						// but still try to close, and report closing errors if they occur.
						var threw = true
						var ret
						try {
							ret = fs.fchmodSync(fd, mode)
							threw = false
						} finally {
							if (threw) {
								try {
									fs.closeSync(fd)
								} catch (er) {}
							} else {
								fs.closeSync(fd)
							}
						}
						return ret
					}
				}

				function patchLutimes(fs) {
					if (constants.hasOwnProperty('O_SYMLINK')) {
						fs.lutimes = function(path, at, mt, cb) {
							fs.open(path, constants.O_SYMLINK, function(er, fd) {
								if (er) {
									if (cb) cb(er)
									return
								}
								fs.futimes(fd, at, mt, function(er) {
									fs.close(fd, function(er2) {
										if (cb) cb(er || er2)
									})
								})
							})
						}

						fs.lutimesSync = function(path, at, mt) {
							var fd = fs.openSync(path, constants.O_SYMLINK)
							var ret
							var threw = true
							try {
								ret = fs.futimesSync(fd, at, mt)
								threw = false
							} finally {
								if (threw) {
									try {
										fs.closeSync(fd)
									} catch (er) {}
								} else {
									fs.closeSync(fd)
								}
							}
							return ret
						}
					} else {
						fs.lutimes = function(_a, _b, _c, cb) {
							if (cb) process.nextTick(cb)
						}
						fs.lutimesSync = function() {}
					}
				}

				function chmodFix(orig) {
					if (!orig) return orig
					return function(target, mode, cb) {
						return orig.call(fs, target, mode, function(er) {
							if (chownErOk(er)) er = null
							if (cb) cb.apply(this, arguments)
						})
					}
				}

				function chmodFixSync(orig) {
					if (!orig) return orig
					return function(target, mode) {
						try {
							return orig.call(fs, target, mode)
						} catch (er) {
							if (!chownErOk(er)) throw er
						}
					}
				}

				function chownFix(orig) {
					if (!orig) return orig
					return function(target, uid, gid, cb) {
						return orig.call(fs, target, uid, gid, function(er) {
							if (chownErOk(er)) er = null
							if (cb) cb.apply(this, arguments)
						})
					}
				}

				function chownFixSync(orig) {
					if (!orig) return orig
					return function(target, uid, gid) {
						try {
							return orig.call(fs, target, uid, gid)
						} catch (er) {
							if (!chownErOk(er)) throw er
						}
					}
				}

				function statFix(orig) {
					if (!orig) return orig
					// Older versions of Node erroneously returned signed integers for
					// uid + gid.
					return function(target, options, cb) {
						if (typeof options === 'function') {
							cb = options
							options = null
						}
						function callback(er, stats) {
							if (stats) {
								if (stats.uid < 0) stats.uid += 0x100000000
								if (stats.gid < 0) stats.gid += 0x100000000
							}
							if (cb) cb.apply(this, arguments)
						}
						return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback)
					}
				}

				function statFixSync(orig) {
					if (!orig) return orig
					// Older versions of Node erroneously returned signed integers for
					// uid + gid.
					return function(target, options) {
						var stats = options ? orig.call(fs, target, options) : orig.call(fs, target)
						if (stats.uid < 0) stats.uid += 0x100000000
						if (stats.gid < 0) stats.gid += 0x100000000
						return stats
					}
				}

				// ENOSYS means that the fs doesn't support the op. Just ignore
				// that, because it doesn't matter.
				//
				// if there's no getuid, or if getuid() is something other
				// than 0, and the error is EINVAL or EPERM, then just ignore
				// it.
				//
				// This specific case is a silent failure in cp, install, tar,
				// and most other unix tools that manage permissions.
				//
				// When running as root, or if other types of errors are
				// encountered, then it's strict.
				function chownErOk(er) {
					if (!er) return true

					if (er.code === 'ENOSYS') return true

					var nonroot = !process.getuid || process.getuid() !== 0
					if (nonroot) {
						if (er.code === 'EINVAL' || er.code === 'EPERM') return true
					}

					return false
				}
			}

			/***/
		},
		/* 22 */
		/***/ (module) => {
			'use strict'
			module.exports = require('constants')

			/***/
		},
		/* 23 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			var Stream = __webpack_require__(24).Stream

			module.exports = legacy

			function legacy(fs) {
				return {
					ReadStream: ReadStream,
					WriteStream: WriteStream
				}

				function ReadStream(path, options) {
					if (!(this instanceof ReadStream)) return new ReadStream(path, options)

					Stream.call(this)

					var self = this

					this.path = path
					this.fd = null
					this.readable = true
					this.paused = false

					this.flags = 'r'
					this.mode = 438 /*=0666*/
					this.bufferSize = 64 * 1024

					options = options || {}

					// Mixin options into this
					var keys = Object.keys(options)
					for (var index = 0, length = keys.length; index < length; index++) {
						var key = keys[index]
						this[key] = options[key]
					}

					if (this.encoding) this.setEncoding(this.encoding)

					if (this.start !== undefined) {
						if ('number' !== typeof this.start) {
							throw TypeError('start must be a Number')
						}
						if (this.end === undefined) {
							this.end = Infinity
						} else if ('number' !== typeof this.end) {
							throw TypeError('end must be a Number')
						}

						if (this.start > this.end) {
							throw new Error('start must be <= end')
						}

						this.pos = this.start
					}

					if (this.fd !== null) {
						process.nextTick(function() {
							self._read()
						})
						return
					}

					fs.open(this.path, this.flags, this.mode, function(err, fd) {
						if (err) {
							self.emit('error', err)
							self.readable = false
							return
						}

						self.fd = fd
						self.emit('open', fd)
						self._read()
					})
				}

				function WriteStream(path, options) {
					if (!(this instanceof WriteStream)) return new WriteStream(path, options)

					Stream.call(this)

					this.path = path
					this.fd = null
					this.writable = true

					this.flags = 'w'
					this.encoding = 'binary'
					this.mode = 438 /*=0666*/
					this.bytesWritten = 0

					options = options || {}

					// Mixin options into this
					var keys = Object.keys(options)
					for (var index = 0, length = keys.length; index < length; index++) {
						var key = keys[index]
						this[key] = options[key]
					}

					if (this.start !== undefined) {
						if ('number' !== typeof this.start) {
							throw TypeError('start must be a Number')
						}
						if (this.start < 0) {
							throw new Error('start must be >= zero')
						}

						this.pos = this.start
					}

					this.busy = false
					this._queue = []

					if (this.fd === null) {
						this._open = fs.open
						this._queue.push([this._open, this.path, this.flags, this.mode, undefined])
						this.flush()
					}
				}
			}

			/***/
		},
		/* 24 */
		/***/ (module) => {
			'use strict'
			module.exports = require('stream')

			/***/
		},
		/* 25 */
		/***/ (module) => {
			'use strict'

			module.exports = clone

			function clone(obj) {
				if (obj === null || typeof obj !== 'object') return obj

				if (obj instanceof Object) var copy = { __proto__: obj.__proto__ }
				else var copy = Object.create(null)

				Object.getOwnPropertyNames(obj).forEach(function(key) {
					Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
				})

				return copy
			}

			/***/
		},
		/* 26 */
		/***/ (module) => {
			'use strict'
			module.exports = require('util')

			/***/
		},
		/* 27 */
		/***/ (module) => {
			'use strict'
			module.exports = require('assert')

			/***/
		},
		/* 28 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			module.exports = {
				copySync: __webpack_require__(29)
			}

			/***/
		},
		/* 29 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const mkdirpSync = __webpack_require__(31).mkdirsSync
			const utimesSync = __webpack_require__(35).utimesMillisSync
			const stat = __webpack_require__(36)

			function copySync(src, dest, opts) {
				if (typeof opts === 'function') {
					opts = { filter: opts }
				}

				opts = opts || {}
				opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
				opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

				// Warn about using preserveTimestamps on 32-bit node
				if (opts.preserveTimestamps && process.arch === 'ia32') {
					console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
				}

				const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy')
				stat.checkParentPathsSync(src, srcStat, dest, 'copy')
				return handleFilterAndCopy(destStat, src, dest, opts)
			}

			function handleFilterAndCopy(destStat, src, dest, opts) {
				if (opts.filter && !opts.filter(src, dest)) return
				const destParent = path.dirname(dest)
				if (!fs.existsSync(destParent)) mkdirpSync(destParent)
				return startCopy(destStat, src, dest, opts)
			}

			function startCopy(destStat, src, dest, opts) {
				if (opts.filter && !opts.filter(src, dest)) return
				return getStats(destStat, src, dest, opts)
			}

			function getStats(destStat, src, dest, opts) {
				const statSync = opts.dereference ? fs.statSync : fs.lstatSync
				const srcStat = statSync(src)

				if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
				else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
					return onFile(srcStat, destStat, src, dest, opts)
				else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
			}

			function onFile(srcStat, destStat, src, dest, opts) {
				if (!destStat) return copyFile(srcStat, src, dest, opts)
				return mayCopyFile(srcStat, src, dest, opts)
			}

			function mayCopyFile(srcStat, src, dest, opts) {
				if (opts.overwrite) {
					fs.unlinkSync(dest)
					return copyFile(srcStat, src, dest, opts)
				} else if (opts.errorOnExist) {
					throw new Error(`'${dest}' already exists`)
				}
			}

			function copyFile(srcStat, src, dest, opts) {
				if (typeof fs.copyFileSync === 'function') {
					fs.copyFileSync(src, dest)
					fs.chmodSync(dest, srcStat.mode)
					if (opts.preserveTimestamps) {
						return utimesSync(dest, srcStat.atime, srcStat.mtime)
					}
					return
				}
				return copyFileFallback(srcStat, src, dest, opts)
			}

			function copyFileFallback(srcStat, src, dest, opts) {
				const BUF_LENGTH = 64 * 1024
				const _buff = __webpack_require__(37)(BUF_LENGTH)

				const fdr = fs.openSync(src, 'r')
				const fdw = fs.openSync(dest, 'w', srcStat.mode)
				let pos = 0

				while (pos < srcStat.size) {
					const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
					fs.writeSync(fdw, _buff, 0, bytesRead)
					pos += bytesRead
				}

				if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime)

				fs.closeSync(fdr)
				fs.closeSync(fdw)
			}

			function onDir(srcStat, destStat, src, dest, opts) {
				if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts)
				if (destStat && !destStat.isDirectory()) {
					throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
				}
				return copyDir(src, dest, opts)
			}

			function mkDirAndCopy(srcStat, src, dest, opts) {
				fs.mkdirSync(dest)
				copyDir(src, dest, opts)
				return fs.chmodSync(dest, srcStat.mode)
			}

			function copyDir(src, dest, opts) {
				fs.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts))
			}

			function copyDirItem(item, src, dest, opts) {
				const srcItem = path.join(src, item)
				const destItem = path.join(dest, item)
				const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy')
				return startCopy(destStat, srcItem, destItem, opts)
			}

			function onLink(destStat, src, dest, opts) {
				let resolvedSrc = fs.readlinkSync(src)
				if (opts.dereference) {
					resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
				}

				if (!destStat) {
					return fs.symlinkSync(resolvedSrc, dest)
				} else {
					let resolvedDest
					try {
						resolvedDest = fs.readlinkSync(dest)
					} catch (err) {
						// dest exists and is a regular file or directory,
						// Windows may throw UNKNOWN error. If dest already exists,
						// fs throws error anyway, so no need to guard against it here.
						if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)
						throw err
					}
					if (opts.dereference) {
						resolvedDest = path.resolve(process.cwd(), resolvedDest)
					}
					if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
						throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
					}

					// prevent copy if src is a subdir of dest since unlinking
					// dest in this case would result in removing src contents
					// and therefore a broken symlink would be created.
					if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
						throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
					}
					return copyLink(resolvedSrc, dest)
				}
			}

			function copyLink(resolvedSrc, dest) {
				fs.unlinkSync(dest)
				return fs.symlinkSync(resolvedSrc, dest)
			}

			module.exports = copySync

			/***/
		},
		/* 30 */
		/***/ (module) => {
			'use strict'
			module.exports = require('path')

			/***/
		},
		/* 31 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const mkdirs = u(__webpack_require__(32))
			const mkdirsSync = __webpack_require__(34)

			module.exports = {
				mkdirs,
				mkdirsSync,
				// alias
				mkdirp: mkdirs,
				mkdirpSync: mkdirsSync,
				ensureDir: mkdirs,
				ensureDirSync: mkdirsSync
			}

			/***/
		},
		/* 32 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const invalidWin32Path = __webpack_require__(33).invalidWin32Path

			const o777 = parseInt('0777', 8)

			function mkdirs(p, opts, callback, made) {
				if (typeof opts === 'function') {
					callback = opts
					opts = {}
				} else if (!opts || typeof opts !== 'object') {
					opts = { mode: opts }
				}

				if (process.platform === 'win32' && invalidWin32Path(p)) {
					const errInval = new Error(p + ' contains invalid WIN32 path characters.')
					errInval.code = 'EINVAL'
					return callback(errInval)
				}

				let mode = opts.mode
				const xfs = opts.fs || fs

				if (mode === undefined) {
					mode = o777 & ~process.umask()
				}
				if (!made) made = null

				callback = callback || function() {}
				p = path.resolve(p)

				xfs.mkdir(p, mode, (er) => {
					if (!er) {
						made = made || p
						return callback(null, made)
					}
					switch (er.code) {
						case 'ENOENT':
							if (path.dirname(p) === p) return callback(er)
							mkdirs(path.dirname(p), opts, (er, made) => {
								if (er) callback(er, made)
								else mkdirs(p, opts, callback, made)
							})
							break

						// In the case of any other error, just see if there's a dir
						// there already.  If so, then hooray!  If not, then something
						// is borked.
						default:
							xfs.stat(p, (er2, stat) => {
								// if the stat fails, then that's super weird.
								// let the original error be the failure reason.
								if (er2 || !stat.isDirectory()) callback(er, made)
								else callback(null, made)
							})
							break
					}
				})
			}

			module.exports = mkdirs

			/***/
		},
		/* 33 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const path = __webpack_require__(30)

			// get drive on windows
			function getRootPath(p) {
				p = path.normalize(path.resolve(p)).split(path.sep)
				if (p.length > 0) return p[0]
				return null
			}

			// http://stackoverflow.com/a/62888/10333 contains more accurate
			// TODO: expand to include the rest
			const INVALID_PATH_CHARS = /[<>:"|?*]/

			function invalidWin32Path(p) {
				const rp = getRootPath(p)
				p = p.replace(rp, '')
				return INVALID_PATH_CHARS.test(p)
			}

			module.exports = {
				getRootPath,
				invalidWin32Path
			}

			/***/
		},
		/* 34 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const invalidWin32Path = __webpack_require__(33).invalidWin32Path

			const o777 = parseInt('0777', 8)

			function mkdirsSync(p, opts, made) {
				if (!opts || typeof opts !== 'object') {
					opts = { mode: opts }
				}

				let mode = opts.mode
				const xfs = opts.fs || fs

				if (process.platform === 'win32' && invalidWin32Path(p)) {
					const errInval = new Error(p + ' contains invalid WIN32 path characters.')
					errInval.code = 'EINVAL'
					throw errInval
				}

				if (mode === undefined) {
					mode = o777 & ~process.umask()
				}
				if (!made) made = null

				p = path.resolve(p)

				try {
					xfs.mkdirSync(p, mode)
					made = made || p
				} catch (err0) {
					if (err0.code === 'ENOENT') {
						if (path.dirname(p) === p) throw err0
						made = mkdirsSync(path.dirname(p), opts, made)
						mkdirsSync(p, opts, made)
					} else {
						// In the case of any other error, just see if there's a dir there
						// already. If so, then hooray!  If not, then something is borked.
						let stat
						try {
							stat = xfs.statSync(p)
						} catch (err1) {
							throw err0
						}
						if (!stat.isDirectory()) throw err0
					}
				}

				return made
			}

			module.exports = mkdirsSync

			/***/
		},
		/* 35 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const os = __webpack_require__(11)
			const path = __webpack_require__(30)

			// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
			function hasMillisResSync() {
				let tmpfile = path.join(
					'millis-test-sync' +
						Date.now().toString() +
						Math.random()
							.toString()
							.slice(2)
				)
				tmpfile = path.join(os.tmpdir(), tmpfile)

				// 550 millis past UNIX epoch
				const d = new Date(1435410243862)
				fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
				const fd = fs.openSync(tmpfile, 'r+')
				fs.futimesSync(fd, d, d)
				fs.closeSync(fd)
				return fs.statSync(tmpfile).mtime > 1435410243000
			}

			function hasMillisRes(callback) {
				let tmpfile = path.join(
					'millis-test' +
						Date.now().toString() +
						Math.random()
							.toString()
							.slice(2)
				)
				tmpfile = path.join(os.tmpdir(), tmpfile)

				// 550 millis past UNIX epoch
				const d = new Date(1435410243862)
				fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', (err) => {
					if (err) return callback(err)
					fs.open(tmpfile, 'r+', (err, fd) => {
						if (err) return callback(err)
						fs.futimes(fd, d, d, (err) => {
							if (err) return callback(err)
							fs.close(fd, (err) => {
								if (err) return callback(err)
								fs.stat(tmpfile, (err, stats) => {
									if (err) return callback(err)
									callback(null, stats.mtime > 1435410243000)
								})
							})
						})
					})
				})
			}

			function timeRemoveMillis(timestamp) {
				if (typeof timestamp === 'number') {
					return Math.floor(timestamp / 1000) * 1000
				} else if (timestamp instanceof Date) {
					return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
				} else {
					throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
				}
			}

			function utimesMillis(path, atime, mtime, callback) {
				// if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
				fs.open(path, 'r+', (err, fd) => {
					if (err) return callback(err)
					fs.futimes(fd, atime, mtime, (futimesErr) => {
						fs.close(fd, (closeErr) => {
							if (callback) callback(futimesErr || closeErr)
						})
					})
				})
			}

			function utimesMillisSync(path, atime, mtime) {
				const fd = fs.openSync(path, 'r+')
				fs.futimesSync(fd, atime, mtime)
				return fs.closeSync(fd)
			}

			module.exports = {
				hasMillisRes,
				hasMillisResSync,
				timeRemoveMillis,
				utimesMillis,
				utimesMillisSync
			}

			/***/
		},
		/* 36 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)

			const NODE_VERSION_MAJOR_WITH_BIGINT = 10
			const NODE_VERSION_MINOR_WITH_BIGINT = 5
			const NODE_VERSION_PATCH_WITH_BIGINT = 0
			const nodeVersion = process.versions.node.split('.')
			const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10)
			const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10)
			const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10)

			function nodeSupportsBigInt() {
				if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
					return true
				} else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
					if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
						return true
					} else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
						if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
							return true
						}
					}
				}
				return false
			}

			function getStats(src, dest, cb) {
				if (nodeSupportsBigInt()) {
					fs.stat(src, { bigint: true }, (err, srcStat) => {
						if (err) return cb(err)
						fs.stat(dest, { bigint: true }, (err, destStat) => {
							if (err) {
								if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
								return cb(err)
							}
							return cb(null, { srcStat, destStat })
						})
					})
				} else {
					fs.stat(src, (err, srcStat) => {
						if (err) return cb(err)
						fs.stat(dest, (err, destStat) => {
							if (err) {
								if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
								return cb(err)
							}
							return cb(null, { srcStat, destStat })
						})
					})
				}
			}

			function getStatsSync(src, dest) {
				let srcStat, destStat
				if (nodeSupportsBigInt()) {
					srcStat = fs.statSync(src, { bigint: true })
				} else {
					srcStat = fs.statSync(src)
				}
				try {
					if (nodeSupportsBigInt()) {
						destStat = fs.statSync(dest, { bigint: true })
					} else {
						destStat = fs.statSync(dest)
					}
				} catch (err) {
					if (err.code === 'ENOENT') return { srcStat, destStat: null }
					throw err
				}
				return { srcStat, destStat }
			}

			function checkPaths(src, dest, funcName, cb) {
				getStats(src, dest, (err, stats) => {
					if (err) return cb(err)
					const { srcStat, destStat } = stats
					if (
						destStat &&
						destStat.ino &&
						destStat.dev &&
						destStat.ino === srcStat.ino &&
						destStat.dev === srcStat.dev
					) {
						return cb(new Error('Source and destination must not be the same.'))
					}
					if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
						return cb(new Error(errMsg(src, dest, funcName)))
					}
					return cb(null, { srcStat, destStat })
				})
			}

			function checkPathsSync(src, dest, funcName) {
				const { srcStat, destStat } = getStatsSync(src, dest)
				if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
					throw new Error('Source and destination must not be the same.')
				}
				if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
					throw new Error(errMsg(src, dest, funcName))
				}
				return { srcStat, destStat }
			}

			// recursively check if dest parent is a subdirectory of src.
			// It works for all file types including symlinks since it
			// checks the src and dest inodes. It starts from the deepest
			// parent and stops once it reaches the src parent or the root path.
			function checkParentPaths(src, srcStat, dest, funcName, cb) {
				const srcParent = path.resolve(path.dirname(src))
				const destParent = path.resolve(path.dirname(dest))
				if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
				if (nodeSupportsBigInt()) {
					fs.stat(destParent, { bigint: true }, (err, destStat) => {
						if (err) {
							if (err.code === 'ENOENT') return cb()
							return cb(err)
						}
						if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
							return cb(new Error(errMsg(src, dest, funcName)))
						}
						return checkParentPaths(src, srcStat, destParent, funcName, cb)
					})
				} else {
					fs.stat(destParent, (err, destStat) => {
						if (err) {
							if (err.code === 'ENOENT') return cb()
							return cb(err)
						}
						if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
							return cb(new Error(errMsg(src, dest, funcName)))
						}
						return checkParentPaths(src, srcStat, destParent, funcName, cb)
					})
				}
			}

			function checkParentPathsSync(src, srcStat, dest, funcName) {
				const srcParent = path.resolve(path.dirname(src))
				const destParent = path.resolve(path.dirname(dest))
				if (destParent === srcParent || destParent === path.parse(destParent).root) return
				let destStat
				try {
					if (nodeSupportsBigInt()) {
						destStat = fs.statSync(destParent, { bigint: true })
					} else {
						destStat = fs.statSync(destParent)
					}
				} catch (err) {
					if (err.code === 'ENOENT') return
					throw err
				}
				if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
					throw new Error(errMsg(src, dest, funcName))
				}
				return checkParentPathsSync(src, srcStat, destParent, funcName)
			}

			// return true if dest is a subdir of src, otherwise false.
			// It only checks the path strings.
			function isSrcSubdir(src, dest) {
				const srcArr = path
					.resolve(src)
					.split(path.sep)
					.filter((i) => i)
				const destArr = path
					.resolve(dest)
					.split(path.sep)
					.filter((i) => i)
				return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
			}

			function errMsg(src, dest, funcName) {
				return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
			}

			module.exports = {
				checkPaths,
				checkPathsSync,
				checkParentPaths,
				checkParentPathsSync,
				isSrcSubdir
			}

			/***/
		},
		/* 37 */
		/***/ (module) => {
			'use strict'

			/* eslint-disable node/no-deprecated-api */
			module.exports = function(size) {
				if (typeof Buffer.allocUnsafe === 'function') {
					try {
						return Buffer.allocUnsafe(size)
					} catch (e) {
						return new Buffer(size)
					}
				}
				return new Buffer(size)
			}

			/***/
		},
		/* 38 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			module.exports = {
				copy: u(__webpack_require__(39))
			}

			/***/
		},
		/* 39 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const mkdirp = __webpack_require__(31).mkdirs
			const pathExists = __webpack_require__(40).pathExists
			const utimes = __webpack_require__(35).utimesMillis
			const stat = __webpack_require__(36)

			function copy(src, dest, opts, cb) {
				if (typeof opts === 'function' && !cb) {
					cb = opts
					opts = {}
				} else if (typeof opts === 'function') {
					opts = { filter: opts }
				}

				cb = cb || function() {}
				opts = opts || {}

				opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
				opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

				// Warn about using preserveTimestamps on 32-bit node
				if (opts.preserveTimestamps && process.arch === 'ia32') {
					console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
				}

				stat.checkPaths(src, dest, 'copy', (err, stats) => {
					if (err) return cb(err)
					const { srcStat, destStat } = stats
					stat.checkParentPaths(src, srcStat, dest, 'copy', (err) => {
						if (err) return cb(err)
						if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
						return checkParentDir(destStat, src, dest, opts, cb)
					})
				})
			}

			function checkParentDir(destStat, src, dest, opts, cb) {
				const destParent = path.dirname(dest)
				pathExists(destParent, (err, dirExists) => {
					if (err) return cb(err)
					if (dirExists) return startCopy(destStat, src, dest, opts, cb)
					mkdirp(destParent, (err) => {
						if (err) return cb(err)
						return startCopy(destStat, src, dest, opts, cb)
					})
				})
			}

			function handleFilter(onInclude, destStat, src, dest, opts, cb) {
				Promise.resolve(opts.filter(src, dest)).then(
					(include) => {
						if (include) return onInclude(destStat, src, dest, opts, cb)
						return cb()
					},
					(error) => cb(error)
				)
			}

			function startCopy(destStat, src, dest, opts, cb) {
				if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
				return getStats(destStat, src, dest, opts, cb)
			}

			function getStats(destStat, src, dest, opts, cb) {
				const stat = opts.dereference ? fs.stat : fs.lstat
				stat(src, (err, srcStat) => {
					if (err) return cb(err)

					if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
					else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
						return onFile(srcStat, destStat, src, dest, opts, cb)
					else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
				})
			}

			function onFile(srcStat, destStat, src, dest, opts, cb) {
				if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
				return mayCopyFile(srcStat, src, dest, opts, cb)
			}

			function mayCopyFile(srcStat, src, dest, opts, cb) {
				if (opts.overwrite) {
					fs.unlink(dest, (err) => {
						if (err) return cb(err)
						return copyFile(srcStat, src, dest, opts, cb)
					})
				} else if (opts.errorOnExist) {
					return cb(new Error(`'${dest}' already exists`))
				} else return cb()
			}

			function copyFile(srcStat, src, dest, opts, cb) {
				if (typeof fs.copyFile === 'function') {
					return fs.copyFile(src, dest, (err) => {
						if (err) return cb(err)
						return setDestModeAndTimestamps(srcStat, dest, opts, cb)
					})
				}
				return copyFileFallback(srcStat, src, dest, opts, cb)
			}

			function copyFileFallback(srcStat, src, dest, opts, cb) {
				const rs = fs.createReadStream(src)
				rs.on('error', (err) => cb(err)).once('open', () => {
					const ws = fs.createWriteStream(dest, { mode: srcStat.mode })
					ws.on('error', (err) => cb(err))
						.on('open', () => rs.pipe(ws))
						.once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb))
				})
			}

			function setDestModeAndTimestamps(srcStat, dest, opts, cb) {
				fs.chmod(dest, srcStat.mode, (err) => {
					if (err) return cb(err)
					if (opts.preserveTimestamps) {
						return utimes(dest, srcStat.atime, srcStat.mtime, cb)
					}
					return cb()
				})
			}

			function onDir(srcStat, destStat, src, dest, opts, cb) {
				if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb)
				if (destStat && !destStat.isDirectory()) {
					return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
				}
				return copyDir(src, dest, opts, cb)
			}

			function mkDirAndCopy(srcStat, src, dest, opts, cb) {
				fs.mkdir(dest, (err) => {
					if (err) return cb(err)
					copyDir(src, dest, opts, (err) => {
						if (err) return cb(err)
						return fs.chmod(dest, srcStat.mode, cb)
					})
				})
			}

			function copyDir(src, dest, opts, cb) {
				fs.readdir(src, (err, items) => {
					if (err) return cb(err)
					return copyDirItems(items, src, dest, opts, cb)
				})
			}

			function copyDirItems(items, src, dest, opts, cb) {
				const item = items.pop()
				if (!item) return cb()
				return copyDirItem(items, item, src, dest, opts, cb)
			}

			function copyDirItem(items, item, src, dest, opts, cb) {
				const srcItem = path.join(src, item)
				const destItem = path.join(dest, item)
				stat.checkPaths(srcItem, destItem, 'copy', (err, stats) => {
					if (err) return cb(err)
					const { destStat } = stats
					startCopy(destStat, srcItem, destItem, opts, (err) => {
						if (err) return cb(err)
						return copyDirItems(items, src, dest, opts, cb)
					})
				})
			}

			function onLink(destStat, src, dest, opts, cb) {
				fs.readlink(src, (err, resolvedSrc) => {
					if (err) return cb(err)
					if (opts.dereference) {
						resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
					}

					if (!destStat) {
						return fs.symlink(resolvedSrc, dest, cb)
					} else {
						fs.readlink(dest, (err, resolvedDest) => {
							if (err) {
								// dest exists and is a regular file or directory,
								// Windows may throw UNKNOWN error. If dest already exists,
								// fs throws error anyway, so no need to guard against it here.
								if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest, cb)
								return cb(err)
							}
							if (opts.dereference) {
								resolvedDest = path.resolve(process.cwd(), resolvedDest)
							}
							if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
								return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
							}

							// do not copy if src is a subdir of dest since unlinking
							// dest in this case would result in removing src contents
							// and therefore a broken symlink would be created.
							if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
								return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
							}
							return copyLink(resolvedSrc, dest, cb)
						})
					}
				})
			}

			function copyLink(resolvedSrc, dest, cb) {
				fs.unlink(dest, (err) => {
					if (err) return cb(err)
					return fs.symlink(resolvedSrc, dest, cb)
				})
			}

			module.exports = copy

			/***/
		},
		/* 40 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromPromise
			const fs = __webpack_require__(17)

			function pathExists(path) {
				return fs
					.access(path)
					.then(() => true)
					.catch(() => false)
			}

			module.exports = {
				pathExists: u(pathExists),
				pathExistsSync: fs.existsSync
			}

			/***/
		},
		/* 41 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const mkdir = __webpack_require__(31)
			const remove = __webpack_require__(42)

			const emptyDir = u(function emptyDir(dir, callback) {
				callback = callback || function() {}
				fs.readdir(dir, (err, items) => {
					if (err) return mkdir.mkdirs(dir, callback)

					items = items.map((item) => path.join(dir, item))

					deleteItem()

					function deleteItem() {
						const item = items.pop()
						if (!item) return callback()
						remove.remove(item, (err) => {
							if (err) return callback(err)
							deleteItem()
						})
					}
				})
			})

			function emptyDirSync(dir) {
				let items
				try {
					items = fs.readdirSync(dir)
				} catch (err) {
					return mkdir.mkdirsSync(dir)
				}

				items.forEach((item) => {
					item = path.join(dir, item)
					remove.removeSync(item)
				})
			}

			module.exports = {
				emptyDirSync,
				emptydirSync: emptyDirSync,
				emptyDir,
				emptydir: emptyDir
			}

			/***/
		},
		/* 42 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const rimraf = __webpack_require__(43)

			module.exports = {
				remove: u(rimraf),
				removeSync: rimraf.sync
			}

			/***/
		},
		/* 43 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const assert = __webpack_require__(27)

			const isWindows = process.platform === 'win32'

			function defaults(options) {
				const methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir']
				methods.forEach((m) => {
					options[m] = options[m] || fs[m]
					m = m + 'Sync'
					options[m] = options[m] || fs[m]
				})

				options.maxBusyTries = options.maxBusyTries || 3
			}

			function rimraf(p, options, cb) {
				let busyTries = 0

				if (typeof options === 'function') {
					cb = options
					options = {}
				}

				assert(p, 'rimraf: missing path')
				assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
				assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required')
				assert(options, 'rimraf: invalid options argument provided')
				assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

				defaults(options)

				rimraf_(p, options, function CB(er) {
					if (er) {
						if (
							(er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
							busyTries < options.maxBusyTries
						) {
							busyTries++
							const time = busyTries * 100
							// try again, with the same exact callback as this one.
							return setTimeout(() => rimraf_(p, options, CB), time)
						}

						// already gone
						if (er.code === 'ENOENT') er = null
					}

					cb(er)
				})
			}

			// Two possible strategies.
			// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
			// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
			//
			// Both result in an extra syscall when you guess wrong.  However, there
			// are likely far more normal files in the world than directories.  This
			// is based on the assumption that a the average number of files per
			// directory is >= 1.
			//
			// If anyone ever complains about this, then I guess the strategy could
			// be made configurable somehow.  But until then, YAGNI.
			function rimraf_(p, options, cb) {
				assert(p)
				assert(options)
				assert(typeof cb === 'function')

				// sunos lets the root user unlink directories, which is... weird.
				// so we have to lstat here and make sure it's not a dir.
				options.lstat(p, (er, st) => {
					if (er && er.code === 'ENOENT') {
						return cb(null)
					}

					// Windows can EPERM on stat.  Life is suffering.
					if (er && er.code === 'EPERM' && isWindows) {
						return fixWinEPERM(p, options, er, cb)
					}

					if (st && st.isDirectory()) {
						return rmdir(p, options, er, cb)
					}

					options.unlink(p, (er) => {
						if (er) {
							if (er.code === 'ENOENT') {
								return cb(null)
							}
							if (er.code === 'EPERM') {
								return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb)
							}
							if (er.code === 'EISDIR') {
								return rmdir(p, options, er, cb)
							}
						}
						return cb(er)
					})
				})
			}

			function fixWinEPERM(p, options, er, cb) {
				assert(p)
				assert(options)
				assert(typeof cb === 'function')
				if (er) {
					assert(er instanceof Error)
				}

				options.chmod(p, 0o666, (er2) => {
					if (er2) {
						cb(er2.code === 'ENOENT' ? null : er)
					} else {
						options.stat(p, (er3, stats) => {
							if (er3) {
								cb(er3.code === 'ENOENT' ? null : er)
							} else if (stats.isDirectory()) {
								rmdir(p, options, er, cb)
							} else {
								options.unlink(p, cb)
							}
						})
					}
				})
			}

			function fixWinEPERMSync(p, options, er) {
				let stats

				assert(p)
				assert(options)
				if (er) {
					assert(er instanceof Error)
				}

				try {
					options.chmodSync(p, 0o666)
				} catch (er2) {
					if (er2.code === 'ENOENT') {
						return
					} else {
						throw er
					}
				}

				try {
					stats = options.statSync(p)
				} catch (er3) {
					if (er3.code === 'ENOENT') {
						return
					} else {
						throw er
					}
				}

				if (stats.isDirectory()) {
					rmdirSync(p, options, er)
				} else {
					options.unlinkSync(p)
				}
			}

			function rmdir(p, options, originalEr, cb) {
				assert(p)
				assert(options)
				if (originalEr) {
					assert(originalEr instanceof Error)
				}
				assert(typeof cb === 'function')

				// try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
				// if we guessed wrong, and it's not a directory, then
				// raise the original error.
				options.rmdir(p, (er) => {
					if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
						rmkids(p, options, cb)
					} else if (er && er.code === 'ENOTDIR') {
						cb(originalEr)
					} else {
						cb(er)
					}
				})
			}

			function rmkids(p, options, cb) {
				assert(p)
				assert(options)
				assert(typeof cb === 'function')

				options.readdir(p, (er, files) => {
					if (er) return cb(er)

					let n = files.length
					let errState

					if (n === 0) return options.rmdir(p, cb)

					files.forEach((f) => {
						rimraf(path.join(p, f), options, (er) => {
							if (errState) {
								return
							}
							if (er) return cb((errState = er))
							if (--n === 0) {
								options.rmdir(p, cb)
							}
						})
					})
				})
			}

			// this looks simpler, and is strictly *faster*, but will
			// tie up the JavaScript thread and fail on excessively
			// deep directory trees.
			function rimrafSync(p, options) {
				let st

				options = options || {}
				defaults(options)

				assert(p, 'rimraf: missing path')
				assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
				assert(options, 'rimraf: missing options')
				assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

				try {
					st = options.lstatSync(p)
				} catch (er) {
					if (er.code === 'ENOENT') {
						return
					}

					// Windows can EPERM on stat.  Life is suffering.
					if (er.code === 'EPERM' && isWindows) {
						fixWinEPERMSync(p, options, er)
					}
				}

				try {
					// sunos lets the root user unlink directories, which is... weird.
					if (st && st.isDirectory()) {
						rmdirSync(p, options, null)
					} else {
						options.unlinkSync(p)
					}
				} catch (er) {
					if (er.code === 'ENOENT') {
						return
					} else if (er.code === 'EPERM') {
						return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
					} else if (er.code !== 'EISDIR') {
						throw er
					}
					rmdirSync(p, options, er)
				}
			}

			function rmdirSync(p, options, originalEr) {
				assert(p)
				assert(options)
				if (originalEr) {
					assert(originalEr instanceof Error)
				}

				try {
					options.rmdirSync(p)
				} catch (er) {
					if (er.code === 'ENOTDIR') {
						throw originalEr
					} else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
						rmkidsSync(p, options)
					} else if (er.code !== 'ENOENT') {
						throw er
					}
				}
			}

			function rmkidsSync(p, options) {
				assert(p)
				assert(options)
				options.readdirSync(p).forEach((f) => rimrafSync(path.join(p, f), options))

				if (isWindows) {
					// We only end up here once we got ENOTEMPTY at least once, and
					// at this point, we are guaranteed to have removed all the kids.
					// So, we know that it won't be ENOENT or ENOTDIR or anything else.
					// try really hard to delete stuff on windows, because it has a
					// PROFOUNDLY annoying habit of not closing handles promptly when
					// files are deleted, resulting in spurious ENOTEMPTY errors.
					const startTime = Date.now()
					do {
						try {
							const ret = options.rmdirSync(p, options)
							return ret
						} catch (er) {}
					} while (Date.now() - startTime < 500) // give up after 500ms
				} else {
					const ret = options.rmdirSync(p, options)
					return ret
				}
			}

			module.exports = rimraf
			rimraf.sync = rimrafSync

			/***/
		},
		/* 44 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const file = __webpack_require__(45)
			const link = __webpack_require__(46)
			const symlink = __webpack_require__(47)

			module.exports = {
				// file
				createFile: file.createFile,
				createFileSync: file.createFileSync,
				ensureFile: file.createFile,
				ensureFileSync: file.createFileSync,
				// link
				createLink: link.createLink,
				createLinkSync: link.createLinkSync,
				ensureLink: link.createLink,
				ensureLinkSync: link.createLinkSync,
				// symlink
				createSymlink: symlink.createSymlink,
				createSymlinkSync: symlink.createSymlinkSync,
				ensureSymlink: symlink.createSymlink,
				ensureSymlinkSync: symlink.createSymlinkSync
			}

			/***/
		},
		/* 45 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const path = __webpack_require__(30)
			const fs = __webpack_require__(19)
			const mkdir = __webpack_require__(31)
			const pathExists = __webpack_require__(40).pathExists

			function createFile(file, callback) {
				function makeFile() {
					fs.writeFile(file, '', (err) => {
						if (err) return callback(err)
						callback()
					})
				}

				fs.stat(file, (err, stats) => {
					// eslint-disable-line handle-callback-err
					if (!err && stats.isFile()) return callback()
					const dir = path.dirname(file)
					pathExists(dir, (err, dirExists) => {
						if (err) return callback(err)
						if (dirExists) return makeFile()
						mkdir.mkdirs(dir, (err) => {
							if (err) return callback(err)
							makeFile()
						})
					})
				})
			}

			function createFileSync(file) {
				let stats
				try {
					stats = fs.statSync(file)
				} catch (e) {}
				if (stats && stats.isFile()) return

				const dir = path.dirname(file)
				if (!fs.existsSync(dir)) {
					mkdir.mkdirsSync(dir)
				}

				fs.writeFileSync(file, '')
			}

			module.exports = {
				createFile: u(createFile),
				createFileSync
			}

			/***/
		},
		/* 46 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const path = __webpack_require__(30)
			const fs = __webpack_require__(19)
			const mkdir = __webpack_require__(31)
			const pathExists = __webpack_require__(40).pathExists

			function createLink(srcpath, dstpath, callback) {
				function makeLink(srcpath, dstpath) {
					fs.link(srcpath, dstpath, (err) => {
						if (err) return callback(err)
						callback(null)
					})
				}

				pathExists(dstpath, (err, destinationExists) => {
					if (err) return callback(err)
					if (destinationExists) return callback(null)
					fs.lstat(srcpath, (err) => {
						if (err) {
							err.message = err.message.replace('lstat', 'ensureLink')
							return callback(err)
						}

						const dir = path.dirname(dstpath)
						pathExists(dir, (err, dirExists) => {
							if (err) return callback(err)
							if (dirExists) return makeLink(srcpath, dstpath)
							mkdir.mkdirs(dir, (err) => {
								if (err) return callback(err)
								makeLink(srcpath, dstpath)
							})
						})
					})
				})
			}

			function createLinkSync(srcpath, dstpath) {
				const destinationExists = fs.existsSync(dstpath)
				if (destinationExists) return undefined

				try {
					fs.lstatSync(srcpath)
				} catch (err) {
					err.message = err.message.replace('lstat', 'ensureLink')
					throw err
				}

				const dir = path.dirname(dstpath)
				const dirExists = fs.existsSync(dir)
				if (dirExists) return fs.linkSync(srcpath, dstpath)
				mkdir.mkdirsSync(dir)

				return fs.linkSync(srcpath, dstpath)
			}

			module.exports = {
				createLink: u(createLink),
				createLinkSync
			}

			/***/
		},
		/* 47 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const path = __webpack_require__(30)
			const fs = __webpack_require__(19)
			const _mkdirs = __webpack_require__(31)
			const mkdirs = _mkdirs.mkdirs
			const mkdirsSync = _mkdirs.mkdirsSync

			const _symlinkPaths = __webpack_require__(48)
			const symlinkPaths = _symlinkPaths.symlinkPaths
			const symlinkPathsSync = _symlinkPaths.symlinkPathsSync

			const _symlinkType = __webpack_require__(49)
			const symlinkType = _symlinkType.symlinkType
			const symlinkTypeSync = _symlinkType.symlinkTypeSync

			const pathExists = __webpack_require__(40).pathExists

			function createSymlink(srcpath, dstpath, type, callback) {
				callback = typeof type === 'function' ? type : callback
				type = typeof type === 'function' ? false : type

				pathExists(dstpath, (err, destinationExists) => {
					if (err) return callback(err)
					if (destinationExists) return callback(null)
					symlinkPaths(srcpath, dstpath, (err, relative) => {
						if (err) return callback(err)
						srcpath = relative.toDst
						symlinkType(relative.toCwd, type, (err, type) => {
							if (err) return callback(err)
							const dir = path.dirname(dstpath)
							pathExists(dir, (err, dirExists) => {
								if (err) return callback(err)
								if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
								mkdirs(dir, (err) => {
									if (err) return callback(err)
									fs.symlink(srcpath, dstpath, type, callback)
								})
							})
						})
					})
				})
			}

			function createSymlinkSync(srcpath, dstpath, type) {
				const destinationExists = fs.existsSync(dstpath)
				if (destinationExists) return undefined

				const relative = symlinkPathsSync(srcpath, dstpath)
				srcpath = relative.toDst
				type = symlinkTypeSync(relative.toCwd, type)
				const dir = path.dirname(dstpath)
				const exists = fs.existsSync(dir)
				if (exists) return fs.symlinkSync(srcpath, dstpath, type)
				mkdirsSync(dir)
				return fs.symlinkSync(srcpath, dstpath, type)
			}

			module.exports = {
				createSymlink: u(createSymlink),
				createSymlinkSync
			}

			/***/
		},
		/* 48 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const path = __webpack_require__(30)
			const fs = __webpack_require__(19)
			const pathExists = __webpack_require__(40).pathExists

			/**
			 * Function that returns two types of paths, one relative to symlink, and one
			 * relative to the current working directory. Checks if path is absolute or
			 * relative. If the path is relative, this function checks if the path is
			 * relative to symlink or relative to current working directory. This is an
			 * initiative to find a smarter `srcpath` to supply when building symlinks.
			 * This allows you to determine which path to use out of one of three possible
			 * types of source paths. The first is an absolute path. This is detected by
			 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
			 * see if it exists. If it does it's used, if not an error is returned
			 * (callback)/ thrown (sync). The other two options for `srcpath` are a
			 * relative url. By default Node's `fs.symlink` works by creating a symlink
			 * using `dstpath` and expects the `srcpath` to be relative to the newly
			 * created symlink. If you provide a `srcpath` that does not exist on the file
			 * system it results in a broken symlink. To minimize this, the function
			 * checks to see if the 'relative to symlink' source file exists, and if it
			 * does it will use it. If it does not, it checks if there's a file that
			 * exists that is relative to the current working directory, if does its used.
			 * This preserves the expectations of the original fs.symlink spec and adds
			 * the ability to pass in `relative to current working direcotry` paths.
			 */

			function symlinkPaths(srcpath, dstpath, callback) {
				if (path.isAbsolute(srcpath)) {
					return fs.lstat(srcpath, (err) => {
						if (err) {
							err.message = err.message.replace('lstat', 'ensureSymlink')
							return callback(err)
						}
						return callback(null, {
							toCwd: srcpath,
							toDst: srcpath
						})
					})
				} else {
					const dstdir = path.dirname(dstpath)
					const relativeToDst = path.join(dstdir, srcpath)
					return pathExists(relativeToDst, (err, exists) => {
						if (err) return callback(err)
						if (exists) {
							return callback(null, {
								toCwd: relativeToDst,
								toDst: srcpath
							})
						} else {
							return fs.lstat(srcpath, (err) => {
								if (err) {
									err.message = err.message.replace('lstat', 'ensureSymlink')
									return callback(err)
								}
								return callback(null, {
									toCwd: srcpath,
									toDst: path.relative(dstdir, srcpath)
								})
							})
						}
					})
				}
			}

			function symlinkPathsSync(srcpath, dstpath) {
				let exists
				if (path.isAbsolute(srcpath)) {
					exists = fs.existsSync(srcpath)
					if (!exists) throw new Error('absolute srcpath does not exist')
					return {
						toCwd: srcpath,
						toDst: srcpath
					}
				} else {
					const dstdir = path.dirname(dstpath)
					const relativeToDst = path.join(dstdir, srcpath)
					exists = fs.existsSync(relativeToDst)
					if (exists) {
						return {
							toCwd: relativeToDst,
							toDst: srcpath
						}
					} else {
						exists = fs.existsSync(srcpath)
						if (!exists) throw new Error('relative srcpath does not exist')
						return {
							toCwd: srcpath,
							toDst: path.relative(dstdir, srcpath)
						}
					}
				}
			}

			module.exports = {
				symlinkPaths,
				symlinkPathsSync
			}

			/***/
		},
		/* 49 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)

			function symlinkType(srcpath, type, callback) {
				callback = typeof type === 'function' ? type : callback
				type = typeof type === 'function' ? false : type
				if (type) return callback(null, type)
				fs.lstat(srcpath, (err, stats) => {
					if (err) return callback(null, 'file')
					type = stats && stats.isDirectory() ? 'dir' : 'file'
					callback(null, type)
				})
			}

			function symlinkTypeSync(srcpath, type) {
				let stats

				if (type) return type
				try {
					stats = fs.lstatSync(srcpath)
				} catch (e) {
					return 'file'
				}
				return stats && stats.isDirectory() ? 'dir' : 'file'
			}

			module.exports = {
				symlinkType,
				symlinkTypeSync
			}

			/***/
		},
		/* 50 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const jsonFile = __webpack_require__(51)

			jsonFile.outputJson = u(__webpack_require__(53))
			jsonFile.outputJsonSync = __webpack_require__(54)
			// aliases
			jsonFile.outputJSON = jsonFile.outputJson
			jsonFile.outputJSONSync = jsonFile.outputJsonSync
			jsonFile.writeJSON = jsonFile.writeJson
			jsonFile.writeJSONSync = jsonFile.writeJsonSync
			jsonFile.readJSON = jsonFile.readJson
			jsonFile.readJSONSync = jsonFile.readJsonSync

			module.exports = jsonFile

			/***/
		},
		/* 51 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const jsonFile = __webpack_require__(52)

			module.exports = {
				// jsonfile exports
				readJson: u(jsonFile.readFile),
				readJsonSync: jsonFile.readFileSync,
				writeJson: u(jsonFile.writeFile),
				writeJsonSync: jsonFile.writeFileSync
			}

			/***/
		},
		/* 52 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			var _fs
			try {
				_fs = __webpack_require__(19)
			} catch (_) {
				_fs = __webpack_require__(20)
			}

			function readFile(file, options, callback) {
				if (callback == null) {
					callback = options
					options = {}
				}

				if (typeof options === 'string') {
					options = { encoding: options }
				}

				options = options || {}
				var fs = options.fs || _fs

				var shouldThrow = true
				if ('throws' in options) {
					shouldThrow = options.throws
				}

				fs.readFile(file, options, function(err, data) {
					if (err) return callback(err)

					data = stripBom(data)

					var obj
					try {
						obj = JSON.parse(data, options ? options.reviver : null)
					} catch (err2) {
						if (shouldThrow) {
							err2.message = file + ': ' + err2.message
							return callback(err2)
						} else {
							return callback(null, null)
						}
					}

					callback(null, obj)
				})
			}

			function readFileSync(file, options) {
				options = options || {}
				if (typeof options === 'string') {
					options = { encoding: options }
				}

				var fs = options.fs || _fs

				var shouldThrow = true
				if ('throws' in options) {
					shouldThrow = options.throws
				}

				try {
					var content = fs.readFileSync(file, options)
					content = stripBom(content)
					return JSON.parse(content, options.reviver)
				} catch (err) {
					if (shouldThrow) {
						err.message = file + ': ' + err.message
						throw err
					} else {
						return null
					}
				}
			}

			function stringify(obj, options) {
				var spaces
				var EOL = '\n'
				if (typeof options === 'object' && options !== null) {
					if (options.spaces) {
						spaces = options.spaces
					}
					if (options.EOL) {
						EOL = options.EOL
					}
				}

				var str = JSON.stringify(obj, options ? options.replacer : null, spaces)

				return str.replace(/\n/g, EOL) + EOL
			}

			function writeFile(file, obj, options, callback) {
				if (callback == null) {
					callback = options
					options = {}
				}
				options = options || {}
				var fs = options.fs || _fs

				var str = ''
				try {
					str = stringify(obj, options)
				} catch (err) {
					// Need to return whether a callback was passed or not
					if (callback) callback(err, null)
					return
				}

				fs.writeFile(file, str, options, callback)
			}

			function writeFileSync(file, obj, options) {
				options = options || {}
				var fs = options.fs || _fs

				var str = stringify(obj, options)
				// not sure if fs.writeFileSync returns anything, but just in case
				return fs.writeFileSync(file, str, options)
			}

			function stripBom(content) {
				// we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
				if (Buffer.isBuffer(content)) content = content.toString('utf8')
				content = content.replace(/^\uFEFF/, '')
				return content
			}

			var jsonfile = {
				readFile: readFile,
				readFileSync: readFileSync,
				writeFile: writeFile,
				writeFileSync: writeFileSync
			}

			module.exports = jsonfile

			/***/
		},
		/* 53 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const path = __webpack_require__(30)
			const mkdir = __webpack_require__(31)
			const pathExists = __webpack_require__(40).pathExists
			const jsonFile = __webpack_require__(51)

			function outputJson(file, data, options, callback) {
				if (typeof options === 'function') {
					callback = options
					options = {}
				}

				const dir = path.dirname(file)

				pathExists(dir, (err, itDoes) => {
					if (err) return callback(err)
					if (itDoes) return jsonFile.writeJson(file, data, options, callback)

					mkdir.mkdirs(dir, (err) => {
						if (err) return callback(err)
						jsonFile.writeJson(file, data, options, callback)
					})
				})
			}

			module.exports = outputJson

			/***/
		},
		/* 54 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const mkdir = __webpack_require__(31)
			const jsonFile = __webpack_require__(51)

			function outputJsonSync(file, data, options) {
				const dir = path.dirname(file)

				if (!fs.existsSync(dir)) {
					mkdir.mkdirsSync(dir)
				}

				jsonFile.writeJsonSync(file, data, options)
			}

			module.exports = outputJsonSync

			/***/
		},
		/* 55 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			module.exports = {
				moveSync: __webpack_require__(56)
			}

			/***/
		},
		/* 56 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const copySync = __webpack_require__(28).copySync
			const removeSync = __webpack_require__(42).removeSync
			const mkdirpSync = __webpack_require__(31).mkdirpSync
			const stat = __webpack_require__(36)

			function moveSync(src, dest, opts) {
				opts = opts || {}
				const overwrite = opts.overwrite || opts.clobber || false

				const { srcStat } = stat.checkPathsSync(src, dest, 'move')
				stat.checkParentPathsSync(src, srcStat, dest, 'move')
				mkdirpSync(path.dirname(dest))
				return doRename(src, dest, overwrite)
			}

			function doRename(src, dest, overwrite) {
				if (overwrite) {
					removeSync(dest)
					return rename(src, dest, overwrite)
				}
				if (fs.existsSync(dest)) throw new Error('dest already exists.')
				return rename(src, dest, overwrite)
			}

			function rename(src, dest, overwrite) {
				try {
					fs.renameSync(src, dest)
				} catch (err) {
					if (err.code !== 'EXDEV') throw err
					return moveAcrossDevice(src, dest, overwrite)
				}
			}

			function moveAcrossDevice(src, dest, overwrite) {
				const opts = {
					overwrite,
					errorOnExist: true
				}
				copySync(src, dest, opts)
				return removeSync(src)
			}

			module.exports = moveSync

			/***/
		},
		/* 57 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			module.exports = {
				move: u(__webpack_require__(58))
			}

			/***/
		},
		/* 58 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const copy = __webpack_require__(38).copy
			const remove = __webpack_require__(42).remove
			const mkdirp = __webpack_require__(31).mkdirp
			const pathExists = __webpack_require__(40).pathExists
			const stat = __webpack_require__(36)

			function move(src, dest, opts, cb) {
				if (typeof opts === 'function') {
					cb = opts
					opts = {}
				}

				const overwrite = opts.overwrite || opts.clobber || false

				stat.checkPaths(src, dest, 'move', (err, stats) => {
					if (err) return cb(err)
					const { srcStat } = stats
					stat.checkParentPaths(src, srcStat, dest, 'move', (err) => {
						if (err) return cb(err)
						mkdirp(path.dirname(dest), (err) => {
							if (err) return cb(err)
							return doRename(src, dest, overwrite, cb)
						})
					})
				})
			}

			function doRename(src, dest, overwrite, cb) {
				if (overwrite) {
					return remove(dest, (err) => {
						if (err) return cb(err)
						return rename(src, dest, overwrite, cb)
					})
				}
				pathExists(dest, (err, destExists) => {
					if (err) return cb(err)
					if (destExists) return cb(new Error('dest already exists.'))
					return rename(src, dest, overwrite, cb)
				})
			}

			function rename(src, dest, overwrite, cb) {
				fs.rename(src, dest, (err) => {
					if (!err) return cb()
					if (err.code !== 'EXDEV') return cb(err)
					return moveAcrossDevice(src, dest, overwrite, cb)
				})
			}

			function moveAcrossDevice(src, dest, overwrite, cb) {
				const opts = {
					overwrite,
					errorOnExist: true
				}
				copy(src, dest, opts, (err) => {
					if (err) return cb(err)
					return remove(src, cb)
				})
			}

			module.exports = move

			/***/
		},
		/* 59 */
		/***/ (module, __unused_webpack_exports, __webpack_require__) => {
			'use strict'

			const u = __webpack_require__(18).fromCallback
			const fs = __webpack_require__(19)
			const path = __webpack_require__(30)
			const mkdir = __webpack_require__(31)
			const pathExists = __webpack_require__(40).pathExists

			function outputFile(file, data, encoding, callback) {
				if (typeof encoding === 'function') {
					callback = encoding
					encoding = 'utf8'
				}

				const dir = path.dirname(file)
				pathExists(dir, (err, itDoes) => {
					if (err) return callback(err)
					if (itDoes) return fs.writeFile(file, data, encoding, callback)

					mkdir.mkdirs(dir, (err) => {
						if (err) return callback(err)

						fs.writeFile(file, data, encoding, callback)
					})
				})
			}

			function outputFileSync(file, ...args) {
				const dir = path.dirname(file)
				if (fs.existsSync(dir)) {
					return fs.writeFileSync(file, ...args)
				}
				mkdir.mkdirsSync(dir)
				fs.writeFileSync(file, ...args)
			}

			module.exports = {
				outputFile: u(outputFile),
				outputFileSync
			}

			/***/
		}
		/******/
	] // The module cache
	/************************************************************************/
	/******/ /******/ var __webpack_module_cache__ = {} // The require function
	/******/

	/******/ /******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId]
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports
			/******/
		} // Create a new module (and put it into the cache)
		/******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {}
			/******/
		}) // Execute the module function
		/******/

		/******/ /******/ __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__) // Return the exports of the module
		/******/

		/******/ /******/ return module.exports
		/******/
	}
	/******/

	/************************************************************************/
	var __webpack_exports__ = {}
	// This entry need to be wrapped in an IIFE because it need to be in strict mode.
	;(() => {
		'use strict'
		var exports = __webpack_exports__

		Object.defineProperty(exports, '__esModule', { value: true })
		exports.deactivate = exports.activate = void 0
		const vscode = __webpack_require__(1)
		const utils_1 = __webpack_require__(2)
		const generate_1 = __webpack_require__(3)
		function activate({ subscriptions }) {
			utils_1.generateStatusBar('monia-create', 'monia:create')
			utils_1.generateStatusBar('monia-generate', 'monia:generate')
			const create = vscode.commands.registerCommand('monia:create', () => {})
			const generate = vscode.commands.registerCommand('monia:generate', generate_1.default)
			subscriptions.push(generate)
			//TODO: 完成项目新建命令
			//subscriptions.push(create)
		}
		exports.activate = activate
		// this method is called when your extension is deactivated
		function deactivate() {}
		exports.deactivate = deactivate
	})()

	module.exports = __webpack_exports__
	/******/
})()
//# sourceMappingURL=extension.js.map
