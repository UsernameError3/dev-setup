const fs = require('fs');
const path = require('path')
const csvToJson = require('convert-csv-to-json');

const buildCardJSON = () => {
    let fileInputName = path.resolve('data/data.csv'); 
    let fileOutputName = path.resolve('data/data.json');

    console.log('Importing: ', fileInputName);
    console.log('Writing:   ', fileOutputName);
    const data = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileInputName);
    fs.writeFileSync(fileOutputName, JSON.stringify(data, null, 4));
    console.log('Finished Card JSON Export...');
    return;
}

exports.buildCardJSON = buildCardJSON;
