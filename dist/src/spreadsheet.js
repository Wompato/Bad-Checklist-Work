import {uiSingelton as ui} from './UI.js'
import {findObjVal} from './utilities.js'
const xlsx = require('xlsx');

const parseSpreadsheet = (path) => {
    const wb = xlsx.readFile(path);
    const ws = findObjVal(wb.Sheets)
    let sheetData = xlsx.utils.sheet_to_json(ws)
    return sheetData
}

const handleSpreadsheet = (e) => {
    if(ui.fileList.length > 1) {
        alert('Already 2 files uploaded');
        return
    }

    e.dataTransfer ? ui.fileList.push(...e.dataTransfer.files) : ui.fileList.push(...e.target.files);

    if(ui.fileList.length === 2 && !ui.bookstoreContainer.children[1] && !ui.accountingContainer.children[1]) {
       
        const filePath1 = ui.fileList[0].path;
        const sprdsheetJSON1 = parseSpreadsheet(filePath1);
        ui.renderBkstrJSON(sprdsheetJSON1, ui.bookstoreContainer);
        
        const filePath2 = ui.fileList[1].path
        const sprdsheetJSON2 = parseSpreadsheet(filePath2)
        ui.renderAccJSON(sprdsheetJSON2, ui.accountingContainer)
        return
    }
    
    if(ui.fileList.length === 1){
        const filePath1 = ui.fileList[0].path;
        const sprdsheetJSON1 = parseSpreadsheet(filePath1);
        ui.renderBkstrJSON(sprdsheetJSON1, ui.bookstoreContainer);
    } 
    if (ui.fileList.length === 2) {
        const filePath2 = ui.fileList[1].path
        const sprdsheetJSON2 = parseSpreadsheet(filePath2)
        ui.renderAccJSON(sprdsheetJSON2, ui.accountingContainer)
    }   
    
}

export {
    parseSpreadsheet,
    handleSpreadsheet
}