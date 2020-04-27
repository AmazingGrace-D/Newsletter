const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var fname = req.body.firstName;
  var lname = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data)

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/588e4b72bf",
    method: "POST",
    headers: {
      "Authorization": "AG 0d5aba9f72c1d3d703b4ae586f7694f9-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});


// 0d5aba9f72c1d3d703b4ae586f7694f9-us4

// 588e4b72bf
