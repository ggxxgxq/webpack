const index = require('./index.json')
const listmore = require('./listmore.json')

module.exports = function () {
  return {
    'index.php': index,
    "listmore.php":listmore
  }
}
