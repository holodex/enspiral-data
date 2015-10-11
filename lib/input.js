var Path = require('path')
var fs = require('fs')
var assign = require('lodash.assign')
var through = require('through2')
var multistream = require('multistream')

var getDb = require('./db')

module.exports = getInput

function getInput (dir) {
  // get starting db inputs
  var inputs = fs.readdirSync(dir)
  .filter(function (path) { return Path.extname(path) === '.csv'})
  .map(function (path) {
    var type = Path.basename(path, '.csv')
    return getDb(type)
  })
  .map(function (db) {
    return db.createReadStream()
    .pipe(through.obj(function (row, enc, cb) {
      assign(row, { type: db.type })
      cb(null, row)
    }))
  })

  return multistream.obj(inputs)
}
