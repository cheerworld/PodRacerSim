// For unit testing
const fetch = require('node-fetch')
function getRace(id) {

  return fetch(`http://localhost:8000/api/races/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

module.exports = getRace;
