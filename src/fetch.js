const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

fetch('http://boe.es/diario_boe/xml.php?id=BOE-S-20171117')
  .then(res => res.text())
  .then(text => parseXML(text))
  .then(data => console.dir(data));
