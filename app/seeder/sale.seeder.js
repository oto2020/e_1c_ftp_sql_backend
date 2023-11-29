const FILE_NAME = 'ftp.sales.day (TXT).txt';

const fileModule = require('../modules/fileModule.js');
module.exports = () => {
    const db = require("../config/db.config.js");
    const Sale = db.sale;

    let arrObj = fileModule.getArrObj(FILE_NAME);
    
    Sale.bulkCreate(
        arrObj,
        {
            // updateOnDuplicate: ['name', 'division', 'trainer', 'client', 'basis', 'datetime', 'price', 'clients_number', 'clients_number_by_trainer'],
            updateOnDuplicate: ['name', 'division', 'trainer', 'client', 'basis', 'author', 'datetime', 'order_count', 'order_price', 'refund_count', 'refund_price', 'final_price'],
        }).then((arrObj) => {
        console.log(`Продажи ${arrObj.count} внесены`);
    });
};
