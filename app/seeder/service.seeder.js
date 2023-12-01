const fileModule = require('../modules/fileModule.js');
const serviceController = require("../controller/service.controller.js");

module.exports = (fileName) => {
    // Извлекаем данные из файла. Файл в архив
    let arrObj = fileModule.extractObjects(fileName);
    // Загружаем данные в БД
    serviceController.bulkUpdate(arrObj);
};

