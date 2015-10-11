var Path = require('path')
var fs = require('fs')
var FsDb = require('fs-db')

module.exports = getDb

function getDb (type, isTmp) {
  var dir = isTmp ? 'tmp' : ''
  var path = Path.join(process.cwd(), dir, type + '.csv')
  var db = FsDb({
    location: path,
    codec: ['csv', { newline: '\n' }],
    keyAttribute: 'id'
  })
  db.type = type
  return db
}
