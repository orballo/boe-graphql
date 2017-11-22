const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const getDocument = ({ id }) =>
  fetch(`https://boe.es/diario_boe/xml.php?id=${id}`)
    .then(res => res.text())
    .then(parseXML);

const getSumario = ({ id }) =>
  getDocument({ id }).then(({ sumario }) => sumario);

module.exports = {
  getDocument,
  getSumario,
};
