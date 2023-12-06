const db = require("../config/db.config.js");
exports.getConversion = async () => {
    const [results, metadata] = await db.sequelize.query(
        `
        SELECT 
        services.id as serviceId,
        services.datetime as serviceDatetime, 
        services.trainer as serviceTrainer, 
        TIMESTAMPDIFF(DAY,services.datetime,sales.datetime) as 'saleAfterDays', 
        sales.client as saleClient, 
        sales.datetime as saleDatetime, 
        sales.division as saleDivision, 
        sales.name as saleName, 
        sales.trainer as saleTrainer, 
        sales.final_price as saleFinalPrice
        FROM services LEFT JOIN sales ON sales.client = services.client AND TIMESTAMPDIFF(DAY,services.datetime,sales.datetime) >= 0 
        WHERE services.name LIKE '%тестирование%' AND YEAR(services.datetime) = '2023' AND MONTH(services.datetime) = '11'
        ORDER BY services.datetime ASC;
        `
      );
      
      let originalServices = [];
      for (let i = 0; i < results.length; i++) {
        let r = results[i];
        originalServices[r.serviceId] = r;
      }
      let originalServicesCount = originalServices.length;

      let originalSalesDivision = [];
      for (let i = 0; i < results.length; i++) {
        let r = results[i];
        originalSalesDivision[r.serviceId + r.saleDivision] = r;
      }
      let originalSalesDivisionCount = originalSalesDivision.length;

      console.log(`Всего услуг оказано: ${originalServicesCount}`);
      console.log(`Ближайших покупок после оказания услуги: ${originalSalesDivisionCount}`);
    //   console.log(originalSales, originalSales.length);
    //   console.log(JSON.stringify(originalSales, null, 2));
}