const fileModule = require('../modules/fileModule.js');
const saleController = require("../controller/sale.controller.js");

module.exports = (fileName) => {
    // Извлекаем данные из файла. Файл в архив
    let arrObj = fileModule.extractObjects(fileName);
    // Загружаем данные в БД
    saleController.bulkUpdate(arrObj);
};
