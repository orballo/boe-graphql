const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const getDocumento = ({ id }) =>
  fetch(`https://boe.es/diario_boe/xml.php?id=${id}`)
    .then(res => res.text())
    .then(parseXML);

const getSumario = ({ id }) =>
  getDocumento({ id }).then(({ sumario }) => sumario);

const getDisposicion = ({ id }) =>
  getDocumento({ id }).then(({ documento }) => documento);

module.exports = {
  getDocumento,
  getSumario,
  getDisposicion,
};
