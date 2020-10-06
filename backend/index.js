//import the require dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var aws = require('aws-sdk');
require('dotenv').config();
const cors = require('cors');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_lab1',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      : 5 * 60 * 1000
}));


app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

aws.config.update({
  region: process.env.region, // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  signatureVersion:'v4'
})

var customers = require('./customers.js')
var restaurants = require('./restaurants.js')
var orders = require('./orders.js')
var dishes = require('./dishes.js')

app.use('/customers', customers);
app.use('/restaurants', restaurants);
app.use('/orders', orders);
app.use('/dishes', dishes);



//reference : https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689
// Now lets export this function so we can call it from somewhere else
app.post('/sign_s3', function (req, res) {
   const s3 = new aws.S3();  // Create a new instance of S3
   const S3_BUCKET = process.env.Bucket
   const fileName = req.body.fileName;
   const fileType = req.body.fileType;
   console.log(req.body);
   // Set up the payload of what we are sending to the S3 api
   
   const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 500,
            ContentType: fileType,
            ACL: 'public-read',
            };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
   s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
              console.log(err);
              res.json({success: false, error: err})
              }
   // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
   console.log(data)
   const returnData = {
    signedRequest: data,
    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    // Send it all back
    res.json({success:true, data:{returnData}});
    });
});

/*
app.get('*', function(request, response){
  console.log('Page not found');
  response.status('404');
});
*/




//start backend server on port 3001
app.listen(3001);
console.log("Backend Server listening on port 3001");

