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


//Add an event
router.post('/', (request, response) => {
  console.log('Endpoint POST: Add event')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `INSERT into event (ename, edescription, eaddress, elatitude, elongitude, edate, rid, rname) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

  var data = [
    request.body.ename,
    request.body.edescription,
    request.body.eaddress,
    request.body.elatitude,
    request.body.elongitude,
    request.body.edate,
    request.body.rid,
    request.body.rname
  ]

  console.log("data incoming: ", data)
  connection.query(dbQuery, data, (error, results) => {
    if(error) {
      console.log('Could not add the event')
      response.status(404).send('Could not add the event');    
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully added");
    }
  })
});


//Get all events
router.get('/', (request, response) => {
  console.log('Endpoint GET: Get all events')
  console.log('Request Body: ', request.body);
  var dbQuery = (sql `SELECT * from event`);

  connection.query(dbQuery, (error, results) => {
    if(error) {
      console.log('Could not get events')
      response.status(404).send('Could not get events');    
    } else {
      response.writeHead(200,{
        //'Content-Type' : 'text/plain'
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  })
});


//Get all events by a restaurant
router.get('/restaurant/:rid', (request, response) => {
  console.log('Endpoint POST: Add event')
  console.log('Request Body: ', request.body);
  var dbQuery = (sql `SELECT * from event WHERE rid = ?`);

  connection.query(dbQuery, request.params.rid, (error, results) => {
    if(error) {
      console.log('Could not get events')
      response.status(404).send('Could not get events');    
    } else {
      response.writeHead(200,{
        //'Content-Type' : 'text/plain'
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  })
});




//Get all events customer is registered for
router.get('/customers/:cid', (request, response) => {
  console.log('Endpoint POST: Add event')
  console.log('Request Body: ', request.body);
  var dbQuery = (sql `SELECT * from custevent WHERE cid = ?`);

  connection.query(dbQuery, request.params.cid, (error, results) => {
    if(error) {
      console.log('Could not get events')
      response.status(404).send('Could not get events');    
    } else {
      response.writeHead(200,{
        //'Content-Type' : 'text/plain'
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  })
});



//Get all customers going to an event
router.get('/:eid/customers', (request, response) => {
  console.log('Endpoint POST: Add event')
  console.log('Request Body: ', request.body);
  var dbQuery = (sql `SELECT DISTINCT cid as cid from custevent WHERE eid = ?`);

  connection.query(dbQuery, request.params.eid, (error, results) => {
    if(error) {
      console.log('Could not get customers')
      response.status(404).send('Could not get customers');    
    } else {
      response.writeHead(200,{
        //'Content-Type' : 'text/plain'
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  })
});

//Register a customer for an event
router.post('/:eid/customers', (request, response) => {
  console.log('Endpoint POST: Register customer for event')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `INSERT into custevent (cid, eid) VALUES (?,?)`);
  connection.query(dbQuery, [request.body.cid, request.params.eid], (error, results) => {
    if(error) {
      console.log('Could not add customer to event')
      response.status(404).send('Could not add customer to event');    
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully added customer");
    }
  })
})





