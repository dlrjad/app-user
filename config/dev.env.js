'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  domain: '"http://localhost:8090"',
  NODE_ENV: '"development"',
  ROOT_API: '"http://localhost:8090/api"'
})
