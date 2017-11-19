const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const getSumario = ({ date }) =>
  fetch(`http://boe.es/diario_boe/xml.php?id=BOE-S-${date}`)
    .then(res => res.text())
    .then(parseXML)
    .then(({ sumario }) => sumario);

module.exports = {
  getSumario,
};
