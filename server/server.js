require('dotenv').config();

const express = require('express');
const app = express();
const port = 3030;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./db');

const
  router = require('./routes/index');
const {
  credentials
} = require('./config');

app.use(cookieParser(credentials.cookieSecret))
app.use(bodyParser.json());

app.use(express.json());

app.use('/api', router);

app.get('/express_backend', (req, res) => {
  res.send({
    express: "Your express backend is connected to react"
  })
})

app.listen(port, () => console.log(`Listening on port: ${port}`));