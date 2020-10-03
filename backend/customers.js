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
  password : 'beatles14',
  database : 'lab1'
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected to Mysql database!");
});
global.db = connection;


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



//get all customers
router.get('/', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint GET: Get all customers');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from customer`);
  connection.query(dbQuery, (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else if (results.length > 0) {
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
  //connection.end();
  console.log('Connection closed');
});


//Get one customer
router.get('/:cid', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint GET: Get a customer');
  //LATER: Select the required fields needed by restaurants to display in order details
  var dbQuery = (sql `SELECT * from customer WHERE cid = ?`);
  connection.query(dbQuery, [request.params.cid], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else if (results.length == 1) {
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    } else {
      response.status(404).send('No such customer');
    }     
  });
  //connection.end();
});

//Customer signup
router.post('/', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint POST: customer signup')
  console.log('Req Body: ', request.body)

  var dbQuery = (sql `INSERT into customer (cname, cemail, cpassword, cjoined) VALUES (?, ?, ?, ?)`);
  var now = new Date();
  var jsonDate = now.toJSON();
  var joined = new Date(jsonDate);
  console.log(joined);

  bcrypt.hash(request.body.cpassword, 10, (error, hash) => {
    //console.log('Password hash ', hash);
    connection.query(dbQuery, [request.body.cname, request.body.cemail, hash, joined], (error, results) => {
      //console.log(hash);
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
          } else if (results.length > 0) {
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
  //connection.end()
});


//customer login
router.post('/login', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('Endpoint POST: customer login')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `SELECT * from customer WHERE cemail = ?`);
  connection.query(dbQuery, [request.body.cemail], (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else if (results.length > 0) {
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
    } else {
      response.status(404).send('Incorrect login');
    }
  });
  //connection.end();
})

/*
  Customer profile stored at frontend
    cid: state.custProfile.cid,
    cemail: state.custProfile.cemail,
    cpassword: state.custProfile.cpassword,
    cname: state.custProfile.cname,
    cphone: state.custProfile.cphone,
    cabout: state.custProfile.cabout,
    cjoined: state.custProfile.cjoined,
    cphoto: state.custProfile.cphoto,
    cfavrest: state.custProfile.cfavrest,
    cfavcuisine: state.custProfile.cfavcuisine,

    Password needs another backend handler because of encryption
    cjoined needs to stay the same
*/

//Update customer profile
router.put('/:cid', (request, response) => {

  //const connection = getMySQLConnection();
  console.log('Endpoint PUT: customer update')
  console.log('Request Body: ', request.body);

  let updateUserQuery = (sql `UPDATE customer SET cemail = ?, cname = ?, 
                                cphone = ?, cabout = ?, cphoto = ?,
                                cfavrest = ?, cfavcuisine = ? where cid = ?`);

  var data = [
    request.body.cemail,
    request.body.cname,
    request.body.cphone,
    request.body.cabout,
    request.body.cphoto,
    request.body.cfavrest,
    request.body.cfavcuisine,
    request.params.cid
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

//Separate update route for password--call only if password changed at frontend
router.put('/:cid/password', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('\nEndpoint PUT: customer password update')
  console.log('Req Body: ', request.body)

  var dbQuery = (sql `UPDATE customer SET cpassword = ? WHERE cid = ?`);

  bcrypt.hash(request.body.cpassword, 10, (error, hash) => {
    console.log('Password hash ', hash);
    console.log(request.params.cid)
    connection.query(dbQuery, [hash, request.params.cid], (error, results) => {
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




//ORDER MANIPULATION--DONT USE ANY OF THESE

//Place an order --TO BE TESTED
router.post('/:cid/orders', (request, response) => {
  //const connection = getMySQLConnection();
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
  //connection.end()
});



//Get all orders for customer
router.get('/:id/orders', (request, response) => {
  //const connection = getMySQLConnection();
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
  //connection.end()
});


//Get a particular order for customer--MIGHT BE REDUNDANT
router.get('/:cid/orders/:oid', (request, response) => {
  //const connection = getMySQLConnection();
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
  //connection.end();
});























