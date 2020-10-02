const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sql = require('sql-template-strings')
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




//Place a new order
router.post('/orders', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('Endpoint POST: Place an new order')
  console.log('Request Body: ', request.body);

  var now = new Date();
  var jsonDate = now.toJSON();
  var ordertime = new Date(jsonDate);
  console.log(ordertime);

  var insertOrder = (sql `INSERT into order_detail (cid, rid, ooption, ostatus, otype, otime) values (?, ?, ?, ?, ?, ?)`);
  var getOrderId = (sql `SELECT MAX(oid) from order_detail WHERE cid = ? AND rid = ?`);
  var orderDish = (sql `INSERT into order_dish (oid, dname, odquantity) values (?, ?, ?)`);
  var data = [request.params.cid, request.body.rid, request.body.ooption, request.body.ostatus, request.body.otype, ordertime];
  connection.query(insertOrder, data, (error, results) => {
    if(error) {
      response.status(404).send('Could not fetch from database');
    } else {
      //Inserted inside order details, get order id
      connection.query(getOrderId, [request.body.cid, request.body.rid], (error, results1) => {
        if(error) {
          response.status(404).send('Could not fetch order id from database');
        } else {
          //make an entry in order_dish table
          var oid = results1['MAX(oid)'];
          let data = [oid, request.body.dname, request.body.odquenatity]
          connection.query(orderDish, data, (error, results2) => {
            if(error) {
              response.status(404).send('Could not insert into order_dish');
            } else {
              response.writeHead(200,{
                //'Content-Type' : 'text/plain'
                'Content-Type': 'application/json'
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






//Get all orders for a restaurant
router.get('/')




//Get all orders for a customer



