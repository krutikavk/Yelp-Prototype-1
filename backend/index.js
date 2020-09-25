//import the require dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const cors = require('cors');
const sql = require('sql-template-strings')
app.set('view engine', 'ejs');

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


var connection = mysql.createConnection({
  host     : 'yelp-lab1.czetep2ih4kd.us-west-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'admin273!',
  database : 'lab1'
});

/* Connect to the Db */
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
global.db = connection;

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
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

//Route to handle Post Request Call
app.post('/login', (request,response) => {
    
    console.log('Inside Login Post Request');
    //console.log("Req Body : ", username + "password : ",password);
    console.log('Req Body : ',request.body);

    if(request.body.loginOption === 'customer') {
      var dbQuery = (sql `SELECT * from customer WHERE cemail = ? AND cpassword = ?`);
      connection.query(dbQuery, [request.body.username, request.body.password], function(error, results) {
      if(error) {
        response.status(404).send('Could not fetch from database');
      }
      if (results.length > 0) {
        response.cookie('cookie','customer',{maxAge: 900000, httpOnly: false, path : '/'});
        request.session.user = request.body.username;
        response.writeHead(200,{
            //'Content-Type' : 'text/plain'
            'Content-Type': 'application/json'

        })
        //response.end("Successful Login");
        response.end(JSON.stringify(results));
        } else {
          response.status(404).send('Incorrect login');
        }     
      });
    }

    if(request.body.loginOption === 'restaurant') {
      var dbQuery = (sql `SELECT * from restaurant WHERE remail = ? AND rpassword = ?`);
      connection.query(dbQuery, [request.body.username, request.body.password], function(error, results) {
      if(error) {
        response.status(404).send('Could not fetch from database');
      }
      if (results.length > 0) {
        response.cookie('cookie','customer',{maxAge: 900000, httpOnly: false, path : '/'});
        request.session.user = request.body.username;
        response.writeHead(200,{
            'Content-Type' : 'text/plain'
            //'Content-Type': 'application/json'

        })
        response.end("Successful Login");
        //response.end(JSON.stringify(results));
      } else {
        response.status(404).send('Incorrect login');
      }     
    });
    }
});

app.post('/custsignup', (request, response) => {
    console.log("Inside customer signup post")
    console.log("Req Body: ", request.body)

    var dbQuery = (sql `INSERT into customer (cname, cemail, cpassword) VALUES (?, ?, ?)`);

    connection.query(dbQuery, [request.body.cname, request.body.cemail, request.body.cpassword], function(error, results) {
      if(error) {
        console.log('User already exists')
        response.status(404).send('User may already exist');

      } else {
        //also let the customer login
        console.log("cust signup insert succeeded")
        response.cookie('cookie','customer',{maxAge: 900000, httpOnly: false, path : '/'});
        request.session.user = request.body.username;
        /*
        response.writeHead(200,{
            //'Content-Type' : 'text/plain'
            'Content-Type': 'application/json'
        })
        //response.end("Successful Login");
        */
        let getUserQuery = (sql `SELECT * from customer WHERE cemail = ?`);
        connection.query(getUserQuery, [request.body.cemail], function(error, results) {
          if(error) {
            response.status(404).send('Could not fetch from database');
          }
          if (results.length > 0) {
            response.writeHead(200,{
                //'Content-Type' : 'text/plain'
                'Content-Type': 'application/json'

            })
            //response.end("Successful Login");
            response.end(JSON.stringify(results));
            } else {
              response.status(404).send('Incorrect login');
            }     
        });
      }

    });
});

app.put('/custUpdate', function (request, response) {
    let updateUserQuery = (sql `UPDATE customer SET cpassword = ?, cname = ? where cemail = ?`);
    connection.query(updateUserQuery, [req.body.cpassword,req.body.cname, req.body.cemail], function (error, results, fields) {
      if (error) {
        console.log('Could not update the resource')
        response.status(404).send('Could not update the resource'); 
      } else {
        response.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
        response.end("Successful Login");
      }
  });
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(request,response){
    console.log("Inside Home Login");    
    response.writeHead(200, {
        'Content-Type' : 'text/plain'
    })
    response.end('Default view without login')
    
})


app.get('*', function(request, response){
  console.log('Page not found');
  response.status('404');
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");