require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.set('strictQuery', false);

const app = express();

mongoose.connect(
  process.env.API_URL
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

const port = process.env.PORT_TYPE;

app.listen(port, () => {
  console.log(`servidor functionando na porta ${port}`);
});