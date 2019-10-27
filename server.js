const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');