const FILE_NAME = 'ftp.services.day (TXT).txt';

const fileModule = require('../modules/fileModule.js');
module.exports = (db) => {
    const Model = db.service;

    let arrObj = fileModule.getArrObj(FILE_NAME);
    
    Model.bulkCreate(
        arrObj,
        {
            updateOnDuplicate: ['name', 'division', 'trainer', 'client', 'basis', 'datetime', 'price', 'clients_number', 'clients_number_by_trainer'],
            // updateOnDuplicate: ['name', 'division', 'trainer', 'client', 'basis', 'author', 'datetime', 'order_count', 'order_price', 'refund_count', 'refund_price', 'final_price'],
        }).then(() => {
        console.log(`Строки ${arrObj.count} обновлены`);
    });
};
