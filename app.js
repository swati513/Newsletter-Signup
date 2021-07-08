const express = require("express");
const body_parser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(body_parser.urlencoded({extended : true}));

app.post("/",function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields :{
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/01a2974a09";
  const options = {
    method : "POST",
    auth : "Swati:77f3037417ddb44f969f30eb2bf377b9-us1"
  }


 const request =  https.request(url,options,function(response){

   if(response.statusCode === 200){
     res.sendFile(__dirname + "/success.html");
   }
   else{
     res.sendFile(__dirname + "/failure.html");
   }
     response.on("data",function(data){
       console.log(JSON.parse(data));
     })
  })
  request.write(jsonData);
  request.end();
});



app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running");
})

// API KEY
// 77f3037417ddb44f969f30eb2bf377b9-us1

// List Id
// 01a2974a09
