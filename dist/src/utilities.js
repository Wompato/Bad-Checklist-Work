function findObjVal(object) {
    for (var prop in object) {
        if(object[prop]){
            return object[prop]
        } else {
            break;
        }
    }
}

function filterArrays(arr1, arr2) {
    let unqiueResultOne = arr1.filter(function(obj) {
        return !arr2.some(function(obj2){
            
            return obj.LID === obj2.LID;
        });
    });
    return unqiueResultOne
}


export {
    findObjVal,
    filterArrays
}