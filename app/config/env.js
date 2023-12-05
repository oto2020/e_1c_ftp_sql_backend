process.env.TZ = 'Europe/Moscow';

const env = {
    database: "fitness1c",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
    // dialectOptions: {
    //   useUTC: 0, // for reading from database
    // },
    timezone: '+03:00', // for writing to database
  };
  
  module.exports = env;