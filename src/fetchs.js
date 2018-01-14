const axios = require('axios');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

const getDocument = async ({ id }) =>
  await axios(`https://boe.es/diario_boe/xml.php?id=${id}`).then(res => parseXML(res.data));

const getSummary = ({ id }) => getDocument({ id }).then(({ sumario }) => sumario);

const getRegulation = ({ id }) => getDocument({ id }).then(({ documento }) => documento);

module.exports = {
  getDocument,
  getSummary,
  getRegulation,
};
