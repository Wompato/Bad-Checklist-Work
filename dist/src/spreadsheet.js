const xlsx = require('xlsx');
import {findObjVal} from './utilities.js'

const parseSpreadsheet = (path) => {
    const wb = xlsx.readFile(path);
    const ws = findObjVal(wb.Sheets)
    let sheetData = xlsx.utils.sheet_to_json(ws)
    return sheetData
}

export {
    parseSpreadsheet
}