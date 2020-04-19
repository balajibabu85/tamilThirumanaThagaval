//Install express server
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const nodemailer = require('nodemailer');
const fsVar = require('fs');
const multipartMiddleware = multipart({
  uploadDir: path.join(__dirname + '/src/assets/images')
   
});
var mailBodyVar;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/upload', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
   // res.sendFile(path.join(__dirname + '/dist/AppDomain/index.html'));
  console.log('api/upload get service called'); 
res.send("success");
});


app.post('/api/upload', multipartMiddleware, (req, res) => {
console.log("post starts");
var tmp_path = req.files.uploads.path;
console.log("temporary path is" + tmp_path);
var target_path = __dirname+'/src/assets/images/' + req.files.uploads.name;
console.log("target path is" + target_path);

fsVar.rename(tmp_path, target_path, function (err) {
    console.log("rename function starts");
    if (err) {
      console.log("rename function while renaming error is " + err);
      throw err;
    }
    console.log("rename function unlink function starts");
    fsVar.unlink(tmp_path, function () {
      if (err) {
        console.log("rename function while unlinking error is " + err);
        throw err;
      }
      console.log('File uploaded to: ' + target_path);
      
    });
    var target_path2 = __dirname + '/dist/AppDomain/assets/images/' + req.files.uploads.name;
    fsVar.copyFile(target_path, target_path2, (err) => {
      if (err) {
        console.log("rename function while copying file error is " + err);
        throw err;
      }
      console.log('source.txt was copied to destination.txt');
      res.send('File uploaded to: ' + target_path2);
    });
  });

//res.send("file upload successful - balaji");
});
 

app.post('/api/sendmail', (req, res) => {
  console.log('request came');
  let user = req.body.bodyMail;
  debugger;
  console.log(req);
  console.log(user);
  console.log("sendMal function starts");
  sendMail(req.body, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({
        error: 'Failed to send email'
      });
    } else {
      console.log('Email has been sent');
      res.send(info);
    }
  })
})

const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "telugudevangarcommunity@gmail.com",
      pass: "W0rdP@ss"
    }
  });
  transporter.sendMail({
    from: `"Telugu Devangar Community,", "telugudevangarcommunity@gmail.com"`,
    to: user.toMail,
    subject: "Message Subject",
    html: user.bodyMail
    //"<h1>And here is the place for the html</h1>"
  }, callback);
}

const mailOptions = {
  from: `"Balaji Babu", "b2balaji@gmail.com"`,
  to: `b2balaji@outlook.com`,
  subject: "Message Subject",
  html: this.user
  //"<h1>And here is the place for the html</h1>"
}


// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/AppDomain'));

 
app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + '/dist/AppDomain/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(4200, () => console.log(`Example app listening on port ${process.env.PORT}`));
