const timezone = 'UTC+3'
process.env.TZ = timezone

const env = {
    database: "fitness1c",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: timezone, // for writing to database
  };
  
  module.exports = env;