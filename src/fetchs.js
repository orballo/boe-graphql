const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const getSumario = ({ id }) =>
  fetch(`http://boe.es/diario_boe/xml.php?id=${id}`)
    .then(res => res.text())
    .then(parseXML)
    .then(({ sumario }) => sumario);

module.exports = {
  getSumario,
};
