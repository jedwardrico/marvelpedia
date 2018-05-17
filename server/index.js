const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

app.use('/api', require('./routes/comicbooks'));
app.use('/api', require('./routes/mcu'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT;
app.listen(port, ()=> console.log(`listening on port ${port}`));

const { conn } = require('./db');
conn.sync()
