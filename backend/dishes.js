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


//Add a dish
router.post('/', (request, response) => {
  console.log('Endpoint POST: Add dishes')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `INSERT into dish (dname, rid, dingredients, dprice, ddescription, dcategory) VALUES (?, ?, ?, ?, ?, ?)`);

  var data = [
    request.body.dname,
    request.body.rid,
    request.body.dingredients,
    request.body.dprice,
    request.body.ddescription,
    request.body.dcategory
  ]

  connection.query(dbQuery, data, (error, results) => {
    if(error) {
      console.log('Could not add the dish')
      response.status(404).send('Could not add the dish');    
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully added");
    }
  })
});



//Get dishes for restaurant
router.get('/:rid', (request, response) => {
  console.log('Endpoint POST: Add dishes')
  console.log('Request Body: ', request.body);

  var dbQuery = (sql `SELECT * from dish WHERE rid = ?`);

  connection.query(dbQuery, request.params.rid, (error, results) => {
    if(error) {
      console.log('No dishes yet')
      response.status(404).send('No dishes yet'); 
    } else {
      response.writeHead(200,{
        'Content-Type' : 'application/json'
      })
      response.end(JSON.stringify(results));
    }
  })

})
