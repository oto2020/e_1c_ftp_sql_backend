const db = require("../config/db.config.js");
const Sale = db.sale;
const updatingFields = ['name', 'division', 'trainer', 'client', 'basis', 'author', 'datetime', 'order_count', 'order_price', 'refund_count', 'refund_price', 'final_price'];

exports.bulkUpdate = (arrObj) => {
  let length = arrObj.length;
  if (length == 0) return;

  Sale.bulkCreate(
    arrObj, {updateOnDuplicate: updatingFields}).then(() => {
    console.log(`Продажи ${length} внесены`);
  });
}
