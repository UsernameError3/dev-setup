const fs = require('fs');
const path = require('path')
const csvToJson = require('convert-csv-to-json');

const buildCardJSON = () => {
    const errors = [];
    const fileInputName = path.resolve('data/data.csv'); 
    const fileOutputName = path.resolve('data/data.json');
    console.log('Importing: ', fileInputName);
    console.log('Exporting: ', fileOutputName);
    
    // Data Conversion
    const data = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileInputName);
    
    // Data Validation
    for (let i = 0; i < data.length; i++) {
        if (typeof data[i].macEnabled !== "boolean") {
            errors.push(`${data[i].id}: macEnabled is not a boolean`);
        }
        if (typeof data[i].linuxEnabled !== "boolean") {
            errors.push(`${data[i].id}: linuxEnabled is not a boolean`);
        }
        if (typeof data[i].windowsEnabled !== "boolean") {
            errors.push(`${data[i].id}: windowsEnabled is not a boolean`);
        }
    }
    
    // Data Export
    if (errors.length) {
        throw new Error(errors.join('\n'));
    } else {
        fs.writeFileSync(fileOutputName, `${JSON.stringify(data, null, 4)}\n`);
        console.log('Finished Card JSON Export...');
        return;
    }
}

exports.buildCardJSON = buildCardJSON;
