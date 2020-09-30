const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sql = require('sql-template-strings')
const bcrypt = require('bcrypt');

module.exports = router;


/*
//Connect to mysql RDS database
var connection = mysql.createConnection({
  host     : 'yelp-lab1.czetep2ih4kd.us-west-2.rds.amazonaws.com',
  user     : 'admin', 
  password : 'admin273!',
  database : 'lab1'
});
*/

function getMySQLConnection() {
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
  return connection;
}

/*
connection.connect(err => {
  if (err) throw err;
    console.log("Connected to Mysql database!");
});
global.db = connection;
*/

//get all customers
router.get('/', (request, response) => {
  const connection = getMySQLConnection();
  console.log('\nEndpoint GET: Get all customers');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from customer`);
  connection.query(dbQuery, (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length > 0) {
      var res = JSON.stringify(results);
      console.log(res);
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    } else {
      response.status(404).send('No customers found');
    }     
  });
  connection.end();
  console.log('Connection closed');
});


//Get one customer
router.get('/:cid', (request, response) => {
  const connection = getMySQLConnection();
  console.log('\nEndpoint GET: Get a customer');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from customer WHERE cid = ?`);
  connection.query(dbQuery, [request.params.cid], (error, results) => {
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
  connection.end();
});

//Customer signup
router.post('/', (request, response) => {
  const connection = getMySQLConnection();
  console.log('\nEndpoint POST: customer signup')
  console.log('Req Body: ', request.body)

  var dbQuery = (sql `INSERT into customer (cname, cemail, cpassword, cjoined) VALUES (?, ?, ?, ?)`);
  var now = new Date();
  var jsonDate = now.toJSON();
  var then = new Date(jsonDate);
  console.log(then);

  bcrypt.hash(request.body.cpassword, 10, (error, hash) => {
    console.log('Password hash ', hash);
    connection.query(dbQuery, [request.body.cname, request.body.cemail, hash, then], (error, results) => {
      console.log(hash);
      if(error) {
        console.log('User already exists')
        response.status(404).send('User already exists');
      } else {
        //also let the customer login
        console.log("Customer signup succeeded")
        let getUserQuery = (sql `SELECT * from customer WHERE cemail = ?`);
        connection.query(getUserQuery, [request.body.cemail], (error, results) => {
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
  connection.end()
});

//customer login
router.post('/login', (request, response) => {
  const connection = getMySQLConnection();
  console.log('Endpoint POST: customer login')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `SELECT * from customer WHERE cemail = ?`);
  connection.query(dbQuery, [request.body.cemail], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length > 0) {
      console.log(results[0].cpassword)
      console.log(request.body.cpassword)
      bcrypt.compare(request.body.cpassword, results[0].cpassword, (err, result) => {
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
  connection.end();
});


//UPDATE CUSTOMER PROFILE--NEED TO LOOK AT FRONTEND
router.put('/:id', (request, response) => {

  response.send('Update customer profile')
})



//ORDER MANIPULATION

//Place an order --TO BE TESTED
router.post('/:cid/orders', (request, response) => {
  const connection = getMySQLConnection();
  console.log('Endpoint POST: Place an new order')
  console.log('Request Body: ', request.body);

  var now = new Date();
  var jsonDate = now.toJSON();
  var then = new Date(jsonDate);
  console.log(then);

  var insertOrder = (sql `INSERT into order_detail (cid, rid, ooption, ostatus, otype) values (?, ?, ?, ?, ?)`);
  var getOrderId = (sql `SELECT MAX(oid) from order_detail WHERE cid = ?`);
  var orderDish = (sql `INSERT into order_dish (oid, dname, odquantity) values (?, ?, ?)`);
  var data = [request.params.cid, request.body.rid, request.body.ooption, request.body.ostatus, request.body.otype];
  connection.query(insertOrder, data, (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else {
      //Inserted inside order details, get order id
      connection.query(getOrderId, [request.params.oid], (error, results1) => {
        if(error) {
          response.status(404).send('Could not fetch order id from database');
        } else {
          //make an entry in order_dish table
          var oid = results1['MAX(oid)'];
          let data = [oid, request.body.dname, request.body.odquenatity]
          connection.query(orderDish, data, (error, results2) => {
            if(error) {
              response.status(404).send('Could insert into order_dish');
            } else {
              response.writeHead(200,{
                'Content-Type' : 'text/plain'
                //'Content-Type': 'application/json'
              })
              response.end(oid);

            }

          })        //end orderDishn

        }         

      })        //end getOrderId
    }          //end if-else dbquery
  })          //end insertOrder
  connection.end()
});



//Get all orders for customer
router.get('/:id/orders', (request, response) => {
  const connection = getMySQLConnection();
  console.log('Endpoint GET: All Orders for customer')
  console.log('Request Body: ', request.body);
  var dbQuery = (sql `SELECT * from order_detail WHERE cid = ?`);

  connection.query(dbQuery, [request.params.id], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    }
    if (results.length > 0) {
      bcrypt.compare(request.body.cpassword, results[0].cpassword, (err, result) => {
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
  connection.end()
});


//Get a particular order for customer--MIGHT BE REDUNDANT
router.get('/:cid/orders/:oid', (request, response) => {
  const connection = getMySQLConnection();
  console.log('Endpoint GET: 1 order for 1 customer')
  console.log('Request Body: ', request.body)
  var dbQuery = (sql `SELECT * from order_detail WHERE cid = ? and oid = ?`);
  connection.query(dbQuery, [request.params.cid, request.params.oid], (error, results) => {
    if(error) {
      response.status(404).send('No such order exists for customer');
    } else {
      if( results.length > 0) {
        response.writeHead(200,{
            //'Content-Type' : 'text/plain'
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify(results));
      }
    }

  });
  connection.end();
});























