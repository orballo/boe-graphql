const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

fetch(`http://boe.es/diario_boe/xml.php?id=BOE-S-${20171118}`)
  .then(res => res.text())
  .then(parseXML)
  .then(data => console.log(data.sumario.diario[0].sumario_nbo[0].urlPdf));
