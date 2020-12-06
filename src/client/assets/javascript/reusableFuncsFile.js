
function getRace(id) {
  // GET request to `${SERVER}/api/races/${id}`
  return fetch(`${SERVER}/api/races/${id}`, {
      method: 'GET',
      ...defaultFetchOpts(),
    })
    .then(response => response.json())
    //.then(res => console.log(res))
    .catch(err => console.log(err));
}

module.exports = getRace;
