const express = require('express');
const path = require('path');

const app = express();

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});