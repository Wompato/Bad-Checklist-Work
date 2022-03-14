export default class UI {
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

    static createDebtorHTML(debtor, parCont) {
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

    static createDebtorView(array, parCont) {
        array.forEach((debtor)=>{
            UI.createDebtorHTML(debtor, parCont)
        })
    }

    static createFilteredListHTML(filterPlaceholder) {
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
