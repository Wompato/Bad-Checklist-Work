import Debtor from "./Debtor.js";

class UI {
    constructor() {
        this.dropZoneInput = document.querySelector('.drop-zone__input')
        this.dropZone = document.querySelector('.drop-zone')
        this.bookstoreContainer = document.getElementById('bookstore-list');
        this.accountingContainer = document.getElementById('accounting-list');
        this.filterButton = document.querySelector('.filter-btn');
        this.filterListPlaceholder = document.getElementById('filter-list-placeholder')
        this.fileUpload = document.getElementById('file-upload');

        this.bookstrList = [];
        this.accList = [];
        this.fileList = [];
    }

    createDebtorHTML(debtor, parCont) {
        const debtorItem = document.createElement('div');
        debtorItem.classList.add('ranStu');
    
        const debtorName = document.createElement('p');
        const debtorLID = document.createElement('p');
        const divider = document.createElement('span');
        
        debtorName.textContent = debtor.name;
        debtorLID.textContent = `LID: ${debtor.LID}`;
    
        if(debtor.name.length > 10){
            debtorName.classList.add('truncate');
        }
    
        debtorItem.appendChild(debtorName);
        debtorItem.appendChild(divider);
        debtorItem.appendChild(debtorLID);
    
        parCont.appendChild(debtorItem); 
    };

    createDebtorView(array, parCont) {
        array.forEach((debtor)=>{
            this.createDebtorHTML(debtor, parCont)
        })
    }

    createFilteredListHTML(filterPlaceholder) {
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        const div = document.createElement('div');
    
        section.classList.add('filtered-list-container');
        h2.classList.add('filtered-list-text');
        div.setAttribute('id', 'filtered-list');
       
        h2.textContent = 'People not on the accounting list';
    
        filterPlaceholder.appendChild(section);
        section.appendChild(h2);
        section.appendChild(div);
    
        return {
            div,
            h2
        };
    }

    renderBkstrJSON(spreadsheet, container) {
        // turns the excel spreadsheet into debtor objects
        const debtorList = spreadsheet.map(person => {
            return new Debtor(`${person.cu_lname} ${person.cu_fname}`, person.cu_student_id)
        })
        // takes debtor objs transforms them into html and renders them to screen
        this.bookstrList = [...debtorList]
        this.createDebtorView(debtorList, container)
    }
    
    renderAccJSON(spreadsheet, container) {
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
    
        this.accList = [...debtorList]
        this.createDebtorView(debtorList, container)
    }

    updateThumbnail(dropZoneElement, file) {
        // First time - remove the prompt
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
            if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
        // First time - there is no thumbnail element so I create one
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone__thumb");
            dropZoneElement.appendChild(thumbnailElement);
        };  
    
        // Show thumbnail for image files
        if(this.fileList[1]){
            if(this.fileList[0] && this.fileList[1]){
                thumbnailElement.dataset.label = `${this.fileList[0].name}, ${this.fileList[1].name}`;
                thumbnailElement.style.backgroundImage = 'url(public/images/excelImage.png)';
                return
            }
            thumbnailElement.dataset.label = `${this.fileList[0].name}, ${file.name}`
        } else {
            thumbnailElement.dataset.label = file.name;
        }
        
        thumbnailElement.style.backgroundImage = 'url(public/images/excelImage.png)';
    } 
}

const uiSingelton = new UI();

export {uiSingelton}