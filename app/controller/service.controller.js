const db = require("../config/db.config.js");
const Service = db.service;
const updatingFields = ['name', 'division', 'trainer', 'client', 'basis', 'datetime', 'price', 'clients_number', 'clients_number_by_trainer'];

exports.bulkUpdate = (arrObj) => {
  let length = arrObj.length;
  if (length == 0) return;

  Service.bulkCreate(
    arrObj, {updateOnDuplicate: updatingFields}).then(() => {
    console.log(`Оказанные услуги ${length} внесены`);
  });
}
