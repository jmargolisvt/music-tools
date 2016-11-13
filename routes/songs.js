var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for songs
//this will be accessible from http://127.0.0.1:3000/songs if the default route for / is left unchanged
router.route('/')
    //GET all songs
    .get(function(req, res, next) {
        //retrieve all songs from Mongo
        mongoose.model('Song').find({}, function (err, songs) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/songs folder. We are also setting "songs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('songs/index', {
                              title: 'Songs',
                              "songs" : songs
                          });
                    },
                    //JSON response will show all songs in JSON format
                    json: function(){
                        res.json(songs);
                    }
                });
              }
        });
    })
    //POST a new song
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var artist = req.body.artist;
        //call the create function for our database
        mongoose.model('Song').create({
            name : name,
            artist : artist
        }, function (err, song) {
              if (err) {
                  res.send("There was a problem adding the information to the database." + err);
              } else {
                  //Song has been created
                  console.log('POST creating new song: ' + song);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("songs");
                        // And forward to success page
                        res.redirect("/songs");
                    },
                    //JSON response will show the newly created song
                    json: function(){
                        res.json(song);
                    }
                });
              }
        })
    });

/* GET New Song page. */
router.get('/new', function(req, res) {
    res.render('songs/new', { title: 'Add New Song' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Song').findById(id, function (err, song) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(song);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Song').findById(req.id, function (err, song) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + song._id);
        res.format({
          html: function(){
              res.render('songs/show', {
                "song" : song
              });
          },
          json: function(){
              res.json(song);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual song by Mongo ID
	.get(function(req, res) {
	    //search for the song within Mongo
	    mongoose.model('Song').findById(req.id, function (err, song) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the song
	            console.log('GET Retrieving ID: ' + song._id);
	            res.format({
	                //HTML response will render the 'edit.jade' template
	                html: function(){
	                       res.render('songs/edit', {
	                          title: 'Song' + song._id,
	                          "song" : song
	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                       res.json(song);
	                 }
	            });
	        }
	    });
	})
	//PUT to update a song by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
	    var name = req.body.name;
	    var artist = req.body.artist;

	    //find the document by ID
	    mongoose.model('Song').findById(req.id, function (err, song) {
	        //update it
	        song.update({
	            name : name,
	            artist : artist,
	        }, function (err, songID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/songs/" + song._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(song);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Song by ID
	.delete(function (req, res){
	    //find song by ID
	    mongoose.model('Song').findById(req.id, function (err, song) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            song.remove(function (err, song) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + song._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/songs");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : song
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
