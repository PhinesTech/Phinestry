const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/analytics',function(req,res){
  res.sendFile(path.join(__dirname + '/analytics.html'));
});

//add the router
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');