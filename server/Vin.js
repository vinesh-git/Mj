import excelToJson from 'convert-excel-to-json';
import { readFileSync } from 'fs';

const result = excelToJson({
    source: readFileSync('../server/uploads/sample.xls') // fs.readFileSync return a Buffer
});
console.log(result)