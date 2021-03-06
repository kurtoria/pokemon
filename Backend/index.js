var bodyParser= require('body-parser')
var express = require('express')
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID
var {MongoClient, ObjectId} = require('mongodb')


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
app.use(bodyParser.json());

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

//To insert pokemon
app.post('/', function(request, response) {
  response.send(request.body)
  db.collection('pokemons').insertOne({
    "pokeName": request.body.pokeName,
    "pokePic": request.body.pokePic
  }), function(error){
    if (error) {
      response.status(500).send(error);
      return;
    }
  };
})

//To delete pokemon from id
app.delete('/:id', function (request, result) {
  var id = request.params.id;

  db.collection('pokemons').deleteOne({ _id: new ObjectId(id) }, function (error, results) {
    if (error) {
      response.status(500).send(error);
      return;
    }
  });
  result.json({ success: id })
});


//To search after specific name
app.get('/search/:name', function(request, response) {
  db.collection('pokemons').find({"pokeName": request.params.name}).toArray(function (error, result) {
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

module.exports = app
