const express = require('express');
const app = express(); 
const path = require('path');

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const port = 8080; 
app.listen(8080, function() {
    console.log("server listening on port 8080");
});
