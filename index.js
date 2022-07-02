const fs = require('fs');
const path = require('path')
const csvToJson = require('convert-csv-to-json');

let fileInputName = path.resolve('data/data.csv'); 
let fileOutputName = path.resolve('data/data.json');

const data = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileInputName);
fs.writeFileSync(fileOutputName, JSON.stringify(data, null, 4));
