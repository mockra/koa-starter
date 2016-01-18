process.env.NODE_ENV = 'test'
process.env.TEST_ENV = 'test'

global.chai = require('chai')
global.expect = global.chai.expect
global.request = require('supertest')
global._ = require('lodash')

global.app = require('../app')
global.thinky = require('../util/thinky')

global.User = require('../models/user')
