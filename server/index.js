const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api', require('./routes/mcu'));
app.use('/images', require('./routes/images'));

// these are for testing and getting data model structures
app.use('/api', require('./routes/comicbooks'));


app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT;
app.listen(port, ()=> console.log(`listening on port ${port}`));
