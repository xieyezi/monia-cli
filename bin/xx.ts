import * as config from '../package.json'
import chalk from 'chalk'
import program from 'commander'
import semver from 'semver'
import didYouMean from 'didYouMean'
import create from '../lib/create'
import enhanceErrorMessages from '../lib/enhanceErrorMessages'

const requiredVersion = config.engines.node
didYouMean.threshold = 0.6

