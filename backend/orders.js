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




//Place a new order--> Add to order table
router.post('/', (request, response) => {
  //const connection = getMySQLConnection();
  console.log('Endpoint POST: Place an new order')
  console.log('Request Body: ', request.body);

  var now = new Date();
  var jsonDate = now.toJSON();
  var ordertime = new Date(jsonDate);
  console.log(ordertime);

  var insertOrder = (sql `INSERT into order_detail (cid, rid, ooption, ostatus, otype, oaddress, otime) values (?, ?, ?, ?, ?, ?, ?)`);
  var getOrderId = (sql `SELECT MAX(oid) from order_detail WHERE cid = ? AND rid = ?`);
  var orderDish = (sql `INSERT into order_dish (oid, dname, odquantity) values (?, ?, ?)`);

  var data = [request.body.cid, 
              request.body.rid, 
              request.body.ooption, 
              request.body.ostatus, 
              request.body.otype,
              request.body.oaddress, 
              ordertime];

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
          var oid = results1[0]['MAX(oid)'];
          //console.log('-->', results1[0]['MAX(oid)']);
          //console.log("max oid: ", oid)

          /*
          let data = [oid, 
                      request.body.dname, 
                      request.body.odquantity]

          console.log("query 2 data", data)
          connection.query(orderDish, data, (error, results2) => {
            if(error) {
              response.status(404).send('Could not insert into order_dish');
            } else {
              response.writeHead(200,{
                'Content-Type' : 'text/plain'
                //'Content-Type': 'application/json'
              })
              response.end("Order placed");
            }
          })        //end orderDishn
          */
          response.writeHead(200,{
            //'Content-Type' : 'text/plain'
            'Content-Type': 'application/json'
          })
          response.end(JSON.stringify(results1));
        }         
      })        //end getOrderId
    }          //end if-else dbquery
  })          //end insertOrder


  //connection.end()
});


//Place dishes in order_dish table with OID
router.post('/dishes', (request, response) => {
  console.log('Endpoint POST: Place an new orderdish')
  console.log('Request Body: ', request.body);
  let data = [request.body.oid, 
              request.body.did,
              request.body.dname,
              request.body.odquantity ]

  let dbQuery = (sql `INSERT into order_dish (oid, did, dname, odquantity) values (?, ?, ?, ?)`)

  connection.query(dbQuery, data, (error, results) => {
    if(error) {
      response.status(404).send('Could not add order to dishes table');
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
        //'Content-Type': 'application/json'
      })
      response.end("Successfully added");
    }
  })
}) 



//Get all orders for a restaurant
router.get('/restaurants/:rid', (request, response) => {
  console.log('Endpoint GET: Get all orders for restaurant')
  console.log('Request Body: ', request.body);
  console.log(request.params.rid)

  let dbQuery = (sql `SELECT * from order_detail where rid = ? ORDER BY oid DESC`)
  connection.query(dbQuery, request.params.rid, (error, results)=> {
    if( error) {
      console.log("Error fetching orders")
    } else {
      response.writeHead(200,{
        //'Content-Type' : 'text/plain'
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  });
});




//Get all orders for a customer
router.get('/customers/:cid', (request, response) => {
  console.log('Endpoint GET: Get all orders for customer')
  console.log('Request Body: ', request.body);

  let dbQuery = (sql `SELECT * from order_detail where cid = ? ORDER BY oid DESC`)
  connection.query(dbQuery, request.params.cid, (error, results)=> {
    if( error) {
      console.log("Error fetching orders")
    } else {
      response.writeHead(200,{
        //'Content-Type' : 'text/plain'
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  });
});


//get an order
router.get('/:oid', (request, response)=> {
  console.log('Endpoint GET: Get a particular order')
  console.log('Request Body: ', request.body);

  let dbQuery = (sql `SELECT * from order_detail where oid = ?`);
  connection.query(dbQuery, request.params.oid, (error, results)=> {
    if( error) {
      console.log("Error fetching order")
      response.status(404).send('Error fetching order');
    } else if (results.length == 1) {
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    } else {
      response.status(404).send('No such order');
    }

  });

})


//Update an order's status
router.put('/:oid', (request, response)=> {
  console.log('Endpoint PUT: Update order')
  console.log('Request Body: ', request.body);
  let dbQuery = (sql `UPDATE order_detail SET ostatus = ?, otype = ? where oid = ?`);

  connection.query(dbQuery, [request.body.ostatus, request.body.otype, request.params.oid], (error, results)=> {
    if( error) {
      console.log("Error fetching order")
      response.status(404).send('Error fetching order');
    } else {

      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully updated");
    }
  });
})


//Get all dishes in an order
router.get('/:oid/dishes', (request, response) => {
  console.log('Endpoint GET: Dishes in an order')
  console.log('Request Body: ', request.body);
  let dbQuery = (sql `SELECT * from order_dish where oid = ?`);

  connection.query(dbQuery, request.params.oid, (error, results)=> {
    if( error) {
      console.log("Error fetching order")
      response.status(404).send('Error fetching order');
    } else if (results.length >= 1) {
      response.writeHead(200,{
          //'Content-Type' : 'text/plain'
          'Content-Type': 'application/json'
      })
      console.log("response: ", results)
      response.end(JSON.stringify(results));
    } else {
      
      response.status(404).send('Could not find order');
    }
  });

})



