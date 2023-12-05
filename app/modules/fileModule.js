const fs = require('fs');
const path = require('path');
// Преобразует текстовый документ в двумерный массив, а после в массив объектов с конвертацией в число для числовых полей
module.exports.extractObjects = (fileName) => {

    if(!fs.existsSync(fileName)) return [];

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
            parseFloat(arr2[i][j].replace(/\s+/g, '')) || 0 : arr2[i][j];
        }
        obj = Object.assign({}, obj);
        arrObj.push(obj);
    }

    let date = new Date();
    let yyyy = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDay();
    let h = date.getHours();
    let M = date.getMinutes();
    let s = date.getSeconds();
    let newFileName = `${yyyy}-${m}-${d} ${h}-${M}-${s} ${fileName}`;

    let oldPath = path.join(__dirname, '..', '..', fileName);//.replace(/(\s)/, "\\ ");;
    let newPath = path.join(__dirname, '..', '..', 'archive', newFileName);//.replace(/(\s)/, "\\ ");;

    // console.log(oldPath, newPath);
    fs.renameSync(oldPath, newPath);
    // console.log(`${fileName} перенесён в архив`);

    return arrObj;
}