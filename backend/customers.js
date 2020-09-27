const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sql = require('sql-template-strings')
const bcrypt = require('bcrypt');

module.exports = router;



//Connect to mysql RDS database
var connection = mysql.createConnection({
  host     : 'yelp-lab1.czetep2ih4kd.us-west-2.rds.amazonaws.com',
  user     : 'admin', 
  password : 'admin273!',
  database : 'lab1'
});


connection.connect(function(err) {
  if (err) throw err;
    console.log("Connected to Mysql database!");
});
global.db = connection;


//get all customers
router.get('/', (request, response) => {
  console.log('\nEndpoint GET: Get all customers');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from customer`);
  connection.query(dbQuery, function(error, results) {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length > 0) {
      var res = JSON.stringify(results);
      console.log('Stringified results')
      console.log(res);
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    } else {
      response.status(404).send('Incorrect login');
    }     
  });

});

//Customer signup
router.post('/', (request, response) => {
  console.log('\nEndpoint POST: customer signup')
  console.log('Req Body: ', request.body)

  var dbQuery = (sql `INSERT into customer (cname, cemail, cpassword, cjoined) VALUES (?, ?, ?, ?)`);
  var now = new Date();
  var jsonDate = now.toJSON();
  var then = new Date(jsonDate);
  console.log(then);

  bcrypt.hash(request.body.cpassword, 10, function(error, hash) {
    console.log('Password hash ', hash);
    connection.query(dbQuery, [request.body.cname, request.body.cemail, hash, then], function(error, results) {
      console.log(hash);
      if(error) {
        console.log('User already exists')
        response.status(404).send('User already exists');
      } else {
        //also let the customer login
        console.log("Customer signup succeeded")
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

});

//customer login
router.post('/login', (request, response) => {
  console.log('Endpoint POST: customer login')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `SELECT * from customer WHERE cemail = ?`);
  connection.query(dbQuery, [request.body.cemail], function(error, results) {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length > 0) {
      bcrypt.compare(request.body.cpassword, results[0].cpassword, function (err, result) {
        console.log('in db: ', results[0].cpassword);
        if(result === true ) {
          response.writeHead(200,{
            //'Content-Type' : 'text/plain'
            'Content-Type': 'application/json'
          })
          response.end(JSON.stringify(results));
        } else {
          response.status(404).send('Incorrect login');
        }
      });   
    }
  });
});
