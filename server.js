//Install express server
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const fsVar = require('fs');
const multipartMiddleware = multipart({
  uploadDir: path.join(__dirname + '/src/assets/images'),
   
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/upload', multipartMiddleware, (req, res) => {
console.log("post starts");
var tmp_path = req.files.uploads.path;
var target_path = './src/assets/images/' + req.files.uploads.name;
fsVar.rename(tmp_path, target_path, function (err) {
      if (err) throw err;
      fsVar.unlink(tmp_path, function () {
        if (err) throw err;
        res.send('File uploaded to: ' + target_path);
      });
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