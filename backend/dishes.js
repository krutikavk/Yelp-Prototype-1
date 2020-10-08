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
  console.log('Endpoint GET: Get dishes')
  console.log("rid: ", request.params.rid)
  var dbQuery = (sql `SELECT * from dish WHERE rid = ?`);

  connection.query(dbQuery, request.params.rid, (error, results) => {
    if(error) {
      console.log('No dishes yet')
      response.status(404).send('No dishes yet'); 
    } else {
      response.writeHead(200,{
        'Content-Type' : 'application/json'
      })
      console.log('results: ', results);
      response.end(JSON.stringify(results));
    }
  })
})


//edit a dish
router.put('/:did', (request, response) => {
  console.log('Endpoint PUT: Edit a dish')
  let updateUserQuery = (sql `UPDATE dish SET dname = ?, dingredients = ?, 
                                dprice = ?, ddescription = ?, dcategory = ?
                                where did = ?`);

  var data = [
    request.body.dname,
    request.body.dingredients,
    request.body.dprice,
    request.body.ddescription,
    request.body.dcategory,
    request.params.did
  ]

  console.log("received", data);

  connection.query(updateUserQuery, data, (error, results) => {
    if (error) {
      console.log('Could not update the resource')
      response.status(404).send('Could not update the resource'); 
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully updated");
    }
  })
})



//Edit dishes (restaurant)
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


//delete a dish
router.delete('/:did', (request, response) => {
  console.log('Endpoint DELETE: delete a dish')
  let delQuery = (sql `DELETE from dish where did = ?`);

  connection.query(delQuery, data, (error, results, fields) => {
    if (error) {
      console.log('Could not delete the resource')
      response.status(404).send('Could not delete the resource'); 
    } else {
      response.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      response.end("Successfully deleted");
    }
  })
})

