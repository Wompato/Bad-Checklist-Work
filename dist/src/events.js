import {uiSingelton as ui} from './UI.js';
import {handleSpreadsheet} from './spreadsheet.js';
import {filterArrays} from './utilities.js';

ui.fileUpload.addEventListener('change', (e) => {
    if(ui.fileList.length > 1) {
        alert('There are already 2 files uploaded')
        return
    }
    handleSpreadsheet(e);
    // e.target.files[0] is the latest uploaded file, needed for name
    ui.updateThumbnail(ui.dropZone, e.target.files[0])
});

ui.filterButton.addEventListener('click', ()=>{
    if(ui.bookstrList.length > 0 && ui.accList.length > 0){
        const peopleToAdd = filterArrays(ui.accList, ui.bookstrList);
        
        const {div: filterDiv, h2: filterTitle} = ui.createFilteredListHTML(ui.filterListPlaceholder)
        filterDiv.textContent = '';
        if(peopleToAdd.length == 0){
            filterTitle.textContent = 'No one needs to be added'
            return
        }
        ui.createDebtorView(peopleToAdd, filterDiv);
    } else {
        alert('Please add all spreadsheets')
    }
}, {once: true});

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