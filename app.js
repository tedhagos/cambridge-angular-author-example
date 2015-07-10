var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/cambridge');

var authorSchema = new Schema({
  lastname   : {type: String, required: true},
  firstname  : {type: String, required: true},
  books : [String]
});

var Author = mongoose.model('Author', authorSchema);

app.use(express.static('public'));
app.use('/components', express.static('components'));
app.use('/app', express.static('app'));

app.use(bodyParser.json());

app.get('/author', function(req, res){
    Author.find().lean().exec(function(error, data){
    if(!error){
      // console.log(data);
      res.send(data);
    }
    else {
      res.send(error);
    }
  });  
});

app.post('/author', function(req, res){
  var lname = req.body.lastname;
  var fname = req.body.firstname;

  // console.log(lname + " , " + fname);
  // res.send(getAllAuthors());
 
  new Author({
    lastname : req.body.lastname,
    firstname :req.body.firstname,
    books: req.body.books
  }).save(function(err){
    if(!err){
      console.log("Saved ");
    }
    else {
      console.log("Error: " + err);
    }
  });

  // I have to duplicate this code for now,
  // unless I find a way for getAllAuthors() accept
  // a callback


  Author.find().lean().exec(function(error, data){
    if(!error){
      // console.log(data);
      res.send(data);
    }
    else {
      res.send(error);
    }
  });  


});

/*

// This code does not work, because of the async nature of
// find(). I have to find a way to make the getAllAuthors() accept 
// a callback, then I can reuse the codes in many parts of the expres
// route 


var getAllAuthors = function() {

  Author.find().lean().exec(function(error, data){
    if(!error){
      // console.log(data);
      return data;
    }
    else {
      return "Error " + error;
    }
  });  
};

*/

app.listen(3000, function(){console.log("waiting on 3000");});
