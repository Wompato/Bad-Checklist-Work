import Debtor from './src/Debtor.js';
import UI from './src/UI.js'
import { filterArrays } from './src/utilities.js'
import { parseSpreadsheet } from './src/spreadsheet.js';

const ui = new UI();

ui.fileUpload.addEventListener('change', (e) => {
    if(ui.fileList.length > 1) {
        console.log('I am too big')
        return
    }
    handleSpreadsheet(e);
    // e.target.files[0] is the latest uploaded file, needed for name
    ui.updateThumbnail(ui.dropZone, e.target.files[0])
})

ui.filterButton.addEventListener('click', ()=>{
    if(ui.bookstrList.length > 0 && ui.accList.length > 0){
        const peopleToAdd = filterArrays(ui.accList, ui.bookstrList);
        
        const {div: filterDiv, h2: filterTitle} = UI.createFilteredListHTML(ui.filterListPlaceholder)
        filterDiv.textContent = '';
        if(peopleToAdd.length == 0){
            filterTitle.textContent = 'No one needs to be added'
            return
        }
        UI.createDebtorView(peopleToAdd, filterDiv);
    } else {
        alert('Please add all spreadsheets')
    }
}, {once: true})

ui.dropZone.addEventListener("click", () => {
   ui.dropZoneInput.click();
});

ui.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    ui.dropZone.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach((type) => {
    ui.dropZone.addEventListener(type, () => {
      ui.dropZone.classList.remove("drop-zone--over");
    });
});

ui.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
     
    if(ui.fileList.length > 1) {
        alert('You have already uploaded 2 files')
        return
    }
    if (e.dataTransfer.files.length) {
      handleSpreadsheet(e)
      ui.updateThumbnail(ui.dropZone, e.dataTransfer.files[0]);
    }
    ui.dropZone.classList.remove("drop-zone--over");
});

const handleSpreadsheet = (e) => {
    if(ui.fileList.length > 1) {
        console.log('I am too big')
        return
    }

    e.dataTransfer ? ui.fileList.push(...e.dataTransfer.files) : ui.fileList.push(...e.target.files);

    if(ui.fileList.length === 2 && !ui.bookstoreContainer.children[1] && !ui.accountingContainer.children[1]) {
       
        const filePath1 = ui.fileList[0].path;
        const sprdsheetJSON1 = parseSpreadsheet(filePath1);
        renderBkstrJSON(sprdsheetJSON1, ui.bookstoreContainer);
        
        const filePath2 = ui.fileList[1].path
        const sprdsheetJSON2 = parseSpreadsheet(filePath2)
        renderAccJSON(sprdsheetJSON2, ui.accountingContainer)
        return
    }
    
    if(ui.fileList.length === 1){
        const filePath1 = ui.fileList[0].path;
        const sprdsheetJSON1 = parseSpreadsheet(filePath1);
        renderBkstrJSON(sprdsheetJSON1, ui.bookstoreContainer);
    } 
    if (ui.fileList.length === 2) {
        const filePath2 = ui.fileList[1].path
        const sprdsheetJSON2 = parseSpreadsheet(filePath2)
        renderAccJSON(sprdsheetJSON2, ui.accountingContainer)
    }   
    
}


function renderBkstrJSON(spreadsheet, container) {
    // turns the excel spreadsheet into debtor objects
    const debtorList = spreadsheet.map(person => {
        return new Debtor(`${person.cu_lname} ${person.cu_fname}`, person.cu_student_id)
    })
    // takes debtor objs transforms them into html and renders them to screen
    ui.bookstrList = [...debtorList]
    UI.createDebtorView(debtorList, container)
}

function renderAccJSON(spreadsheet, container) {
    // person[Object.keys(person)[0]] is to find the first value 
    // of the spreadsheet (the LID) 
    // the 00 is needed at the start of all ids but for some reason
    // xlsx keeps removing the 00 on this spreadsheet so I'm adding it manually
    const filteredSprdsheet = spreadsheet.filter(person => {
        if(person.Name === undefined){
            return
        }
        if(person.Name === 'Name'){
            return
        }
        return person
    })

    const debtorList = filteredSprdsheet.map(person => {
        return new Debtor(`${person.Name}`, `${'00' + person[Object.keys(person)[0]]}`)
    })

    ui.accList = [...debtorList]
    UI.createDebtorView(debtorList, container)
}

