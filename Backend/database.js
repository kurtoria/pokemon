var bodyParser= require('body-parser')
var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID
//var {MongoClient, ObjectId} = require('mongodb')


var app = express()
var db;


MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) {
    console.error('Failed to connect to the database :()');
    console.log(error);
  } else {
    console.log('Successfully connected to the database :)');
    db = client.db('pokemons');
  }
})

app.use(bodyParser.urlencoded({extended: true}))

app.post('/', (request, result) => {
  //To insert pokemon
  db.collection('pokemons').insert({
    index: '1',
    name: 'Bulbasaur'
  }, function (error, result) {
    // Dokumentet har lagts in.
  });
})

/*
app.post('/', (request, result) => {
  db.collection('pokemons').save(request.body, (error, result) => {
    if (error) {
      return console.log(error)
    }
    console.log('saved to database')
    result.redirect('/')
  })
})
*/


//To get all pokemons
app.get('/', function(request, response) {
  db.collection('pokemons').find().toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.send(result)
  })
})

//Listen pga importante
app.listen(3000, function() {
  console.log("Express is running");
})
