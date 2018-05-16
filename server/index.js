const express = require('express');
const app = express();
require('dotenv').config();

app.use('/api', require('./routes'));

const port = process.env.PORT;
app.listen(port, ()=> console.log(`listening on port ${port}`));