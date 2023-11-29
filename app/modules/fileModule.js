const fs = require('fs');
// Преобразует текстовый документ в двумерный массив, а после в массив объектов с конвертацией в число для числовых полей
module.exports.getArrObj = (fileName) => {
    // читаем наш текстовик
    let bigString = fs.readFileSync(fileName).toString();
    // строки
    let arr2 = bigString.split('\r\n');
    // столбцы
    arr2 = arr2.map(el => el.split('\t'));
    arr2.pop();
    

    // имеем двумерный массив arr2. сделаем массив объектов
    let arrObj = [];
    for (let i = 1; i < arr2.length; i++) {
        let obj = [];
        obj.id = arr2[i][0];
        for (let j = 1; j < arr2[0].length; j++) {
            let fieldName = arr2[0][j]; // нулевая строка
            // если это число
            obj[fieldName] = (fieldName.includes('price') || fieldName.includes('count') || fieldName.includes('number')) ?
            parseFloat(arr2[i][j]) || 0 : arr2[i][j];
        }
        obj = Object.assign({}, obj);
        arrObj.push(obj);
    }
    return arrObj;
}