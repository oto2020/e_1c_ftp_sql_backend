
// Для конверсии ФТ
exports.s1 = () => {
    return `
    USE fitness1c;
    SELECT services.datetime, services.trainer, TIMESTAMPDIFF(DAY,services.datetime,sales.datetime) as 'Через(дней)', sales.client, sales.datetime, sales.division, sales.name, sales.trainer, sales.final_price 
    FROM services LEFT JOIN sales ON sales.client = services.client AND TIMESTAMPDIFF(DAY,services.datetime,sales.datetime) >= 0 
    WHERE services.name LIKE '%тестирование%' AND YEAR(services.datetime) = '2023' AND MONTH(services.datetime) = '11'
    ORDER BY services.datetime DESC;
    `
}

// Конверсия Фт с группировкой по подразделению
exports.s2 =() => {
    return `
    -- SELECT services.id, services.trainer, sales.name, sales.division, sales.trainer FROM services WHERE services.name LIKE '%тестирование%' ORDER BY services.datetime DESC JOIN sales ON sales.client = services.client;
    USE fitness1c;

    -- CREATE VIEW s AS--

    -- Фитнес-тестирования, проведённые в этом месяце
    WITH 
    -- Все услуги, оказанные за период времени
    s AS (SELECT * FROM services WHERE services.name LIKE '%тестирование%' AND services.datetime > '2023-11-01 00:00:00' AND services.datetime < '2023-12-01 00:00:00'), 
    -- Все продажи
    sls AS (SELECT * FROM sales),
    -- Все продажи, совершенные клиентом после того, как ему оказана услуга
    s_all_sls AS (SELECT s.name as s_name, s.datetime as s_datetime, s.trainer as s_trainer, s.client as s_client, TIMESTAMPDIFF(DAY,s.datetime,sls.datetime) as after_days, sls.client, sls.datetime, sls.division, sls.name, sls.trainer, sls.final_price 
    FROM s LEFT JOIN sls ON sls.client = s.client AND TIMESTAMPDIFF(DAY, s.datetime, sls.datetime) >= 0 
    ORDER BY s.datetime DESC),
    -- Промежуточная таблица, где собраны данные (min_after_days, min_datetime, client, division) первых покупок клиента в подразделении из всех продаж, совершенных клиентом после того, как ему оказана услуга
    s_first_sls AS (SELECT s_name, s_datetime, s_trainer, s_client, MIN(after_days) as min_after_days, MIN(datetime) as min_datetime, client, division FROM s_all_sls GROUP BY s_name, s_datetime, s_trainer, s_client, client, division ORDER BY s_datetime DESC),
    s_first_sls_data AS (SELECT s_first_sls.*, sls.name, sls.trainer, sls.final_price FROM s_first_sls LEFT JOIN sls ON (s_first_sls.division = sls.division) AND (s_first_sls.client = sls.client) AND (s_first_sls.min_datetime = sls.datetime) ORDER BY s_datetime DESC)
    SELECT 
    division,
    (SELECT COUNT(distinct s_datetime) FROM s_all_sls) as 'Всего услуг оказано',
    COUNT(distinct min_datetime) as 'Первых продаж',
    SUM(final_price) as 'На сумму'
    FROM s_first_sls_data
    GROUP BY division;
    `
}