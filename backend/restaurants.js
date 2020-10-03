const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sql = require('sql-template-strings')
const bcrypt = require('bcrypt');

module.exports = router;


var connection = mysql.createConnection({
  host     : 'yelp-lab1.czetep2ih4kd.us-west-2.rds.amazonaws.com',
  user     : 'admin', 
  password : 'beatles14',
  database : 'lab1'
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected to Mysql database!");
});
global.db = connection;


//Connect to mysql RDS database
/* NOT STABLE
function getMySQLConnection() {
  var connection = mysql.createConnection({
    host     : 'yelp-lab1.czetep2ih4kd.us-west-2.rds.amazonaws.com',
    user     : 'admin', 
    password : 'beatles14',
    database : 'lab1'
  });
  connection.connect(err => {
  if (err) throw err;
  console.log("Connected to Mysql database!");
  });
  return connection;
}
*/

//get all restaurants TESTED 
router.get('/', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint GET: Get all restaurants');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from restaurant`);
  connection.query(dbQuery, (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else if (results.length > 0) {
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
  //connection.end();
});


//Get one restaurants TESTED
router.get('/:rid', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint GET: Get a restaurant');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from restaurant WHERE rid = ?`);
  connection.query(dbQuery, [request.params.rid], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else if (results.length == 1) {
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    } else {
      response.status(404).send('Incorrect response');
    }     
  });
  //connection.end();
});

//Restaurant signup TESTED
router.post('/', (request, response) => {
  //const connection = getMySQLConnection();
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
  //connection.end();
});

//restaurant login TESTED
router.post('/login', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('Endpoint POST: restaurant login')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `SELECT * from restaurant WHERE remail = ?`);
  connection.query(dbQuery, [request.body.remail], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else if (results.length > 0) {
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
    } else {
      response.status(404).send('Incorrect login');
    }
  });
  //connection.end();
});



/*
      rid: state.restProfile.rid,
      remail: state.restProfile.remail,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
      rlocation: state.restProfile.rlocation,
      rlatitude: state.restProfile.rlatitude,
      rlongitude: state.restProfile.rlongitude,
      raddress: state.restProfile.raddress,
      rcuisine: state.restProfile.rcuisine,
      rdelivery: state.restProfile.rdelivery,

      password will have a separate API

*/

//Restaurant update
router.put('/:rid', (request, response) => {

  //const connection = getMySQLConnection();
  console.log('Endpoint PUT: restaurant update')
  console.log('Request Body: ', request.body);

  let updateUserQuery = (sql `UPDATE restaurant SET remail = ?, rname = ?, 
                                rphone = ?, rabout = ?, rlocation = ?,
                                rlatitude = ?, rlongitude = ?,
                                raddress = ?, rcuisine = ?, rdelivery = ? where rid = ?`);

  var data = [
    request.body.remail,
    request.body.rname,
    request.body.rphone,
    request.body.rabout,
    request.body.rlocation,
    request.body.rlatitude,
    request.body.rlongitude,
    request.body.raddress,
    request.body.rcuisine,
    request.body.rdelivery,
    request.params.rid
  ]

  connection.query(updateUserQuery, data, (error, results, fields) => {
    if (error) {
      console.log('Could not update the resource')
      response.status(404).send('Could not update the resource'); 
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully updated");
    }
  });
  //connection.end();
})



//Update password
router.put('/:rid/password', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint PUT: restaurant password update')
  console.log('Req Body: ', request.body)

  var dbQuery = (sql `UPDATE restaurant SET rpassword = ? WHERE rid = ?`);

  bcrypt.hash(request.body.rpassword, 10, (error, hash) => {
    console.log('Password hash ', hash);
    console.log(request.params.rid)
    connection.query(dbQuery, [hash, request.params.rid], (error, results) => {
      if(error) {
        console.log('Error changing password')
        response.status(404).send('Error changing password');
      } else {
        //also let the customer login
        response.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
        response.end("Successfully updated");
      }
    });
  });
  //connection.end()
})



//ORDER MANIPULATION
/*
1. Get all orders for restaurant
2. Update order status
3. Get particular order


*/


