const fs = require('fs');
const path = require('path')
const csvToJson = require('convert-csv-to-json');

const buildCardJSON = () => {
    const fileInputName = path.resolve('data/data.csv'); 
    const fileOutputName = path.resolve('data/data.json');
    console.log('Importing: ', fileInputName);
    console.log('Exporting: ', fileOutputName);
    
    const data = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileInputName);
    fs.writeFileSync(fileOutputName, JSON.stringify(data, null, 4));
    console.log('Finished Card JSON Export...');
    return;
}

exports.buildCardJSON = buildCardJSON;
