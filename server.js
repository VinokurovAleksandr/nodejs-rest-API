const app = require('./app');
const  mongoose = require('mongoose');
// запуск без HEROKU
// const { DB_HOST } = require('./config');
const { DB_HOST } = process.env;


mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connected successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  })
  .catch(error => {
    console.log("Database connection error", error);
    process.exit(1);
  })


// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })


// Підключення  до mongoose db
