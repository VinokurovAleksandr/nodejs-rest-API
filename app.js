const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// const dotenv = require("dotenv")
require('dotenv').config();


global.basedir = __dirname;




const contactsRouter = require('./routes/api/contacts');
const authReducer = require('./routes/api/auth');


// створюємо сервер 
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger));
app.use(cors());
// Перевіряє чи є в запиті  тіло  , перевіряє contentType, виконує json parse/// middleware
app.use(express.json());
app.use(express.static("public"));

// опис маршруту. Будь який запит який поч. з /api/contacts потрібно оброблюваи contactsRouter  
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authReducer);
// опис помилки якщо сторінки немає
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message})
});

// app.get("/contacts", (req, res)=> {
//   res.json(contacts)
// });



module.exports = app

