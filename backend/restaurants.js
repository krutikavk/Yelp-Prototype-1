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


connection.connect(err => {
  if (err) throw err;
    console.log("Connected to Mysql database!");
});
global.db = connection;


//get all restaurants
router.get('/', (request, response) => {
  console.log('\nEndpoint GET: Get all restaurants');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from restaurant`);
  connection.query(dbQuery, (error, results) => {
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
      response.status(404).send('No restaurants found');
    }     
  });
});


//get one restaurant
//Get a customer
router.get('/:rid', (request, response) => {
  console.log('\nEndpoint GET: Get a restaurant');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from restaurant WHERE rid = ?`);
  connection.query(dbQuery, [request.params.rid], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length == 1) {
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    } else {
      response.status(404).send('Incorrect response');
    }     
  });

});

//Restaurant signup
router.post('/', (request, response) => {
  console.log('\nEndpoint POST: Restaurant signup')
  console.log('Req Body: ', request.body)

  var dbQuery = (sql `INSERT into restaurant (rname, remail, rpassword) VALUES (?, ?, ?)`);

  bcrypt.hash(request.body.rpassword, 10, (error, hash) => {
    console.log('Password hash ', hash);
    connection.query(dbQuery, [request.body.rname, request.body.remail, hash], (error, results) => {
      console.log(hash);
      if(error) {
        console.log('User already exists')
        response.status(404).send('User already exists');
      } else {
        //also let the customer login
        console.log("Customer signup succeeded")
        let getUserQuery = (sql `SELECT * from restaurant WHERE remail = ?`);
        connection.query(getUserQuery, [request.body.remail], (error, results) => {
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
              response.status(404).send('Error');
            }     
        });
      }
    });
  });

});

//restaurant login
router.post('/login', (request, response) => {
  console.log('Endpoint POST: restaurant login')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `SELECT * from restaurant WHERE remail = ?`);
  connection.query(dbQuery, [request.body.remail], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length > 0) {
      bcrypt.compare(request.body.rpassword, results[0].rpassword, (err, result) => {
        console.log('in db: ', results[0].rpassword);
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
