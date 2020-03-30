//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: './uploads'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/api/upload', multipartMiddleware, (req, res) => {
  res.json({
    'message': 'File uploaded succesfully.'
  });
});
 
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/AppDomain'));

 
app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + '/dist/AppDomain/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 1985, () => console.log(`Example app listening on port ${process.env.PORT}`));