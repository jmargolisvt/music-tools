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

//build the REST operations at the base for setlists
//this will be accessible from http://127.0.0.1:3000/setlists if the default route for / is left unchanged
router.route('/')
    //GET all setlists
    .get(function(req, res, next) {
        //retrieve all setlists from Mongo
        mongoose.model('Setlist').find({}, function (err, setlists) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/setlists folder. We are also setting "setlists" to be an accessible variable in our jade view
                    html: function(){
                        res.render('setlists/index', {
                              title: 'Setlists',
                              "setlists" : setlists
                          });
                    },
                    //JSON response will show all setlists in JSON format
                    json: function(){
                        res.json(setlists);
                    }
                });
              }
        });
    })
    //POST a new setlist
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        let list = req.body.array,
            name = req.body.name,
            numSets = req.body.numSets;
        console.log(req);
        //call the create function for our database
        mongoose.model('Setlist').create({
            setlistArray: { $push: { song: list } },
            name: name,
            numSets: numSets
        }, function (err, setlist) {
              if (err) {
                  console.log('ERROR: ' + err);
                  res.send("There was a problem adding the information to the database." + err);
              } else {
                  //Setlist has been created
                  //console.log("req: " + req);
                  console.log('POST creating new setlist: ' + setlist);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("setlists");
                        // And forward to success page
                        res.redirect("/setlists");
                    },
                    //JSON response will show the newly created setlist
                    json: function(){
                        res.json(setlist);
                    }
                });
              }
        })
    });

/* GET New Setlist page. */
router.get('/new', function(req, res) {
    res.render('setlists/new', { title: 'Create a New Setlist' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Setlist').findById(id, function (err, setlist) {
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
            console.log(setlist);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Setlist').findById(req.id, function (err, setlist) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + setlist._id);
        console.log(songArray);
        res.format({
          html: function(){
              res.render('setlists/show', {
                "setlist" : setlist,
                "songArray" : setlist.songArray
              });
          },
          json: function(){
              res.json(setlist);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual setlist by Mongo ID
	.get(function(req, res) {
	    //search for the setlist within Mongo
	    mongoose.model('Setlist').findById(req.id, function (err, setlist) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the setlist
	            console.log('GET Retrieving ID: ' + setlist._id);
              //now get all the available songs
              mongoose.model('Song').find({}, function(err, songs) {
                if (err) {
                  console.log('ERROR: ' + err);
                } else {
	                 res.format({
  	                //HTML response will render the 'edit.jade' template
  	                html: function(){
  	                       res.render('setlists/edit', {
  	                          title: setlist.name,
  	                          setlist : setlist,
                              songArray: setlist.songArray,
                              songs : songs,
                              numSets : setlist.numSets
  	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                       res.json(setlist);
                         res.json(songs);
	                 }
	            });
	        }
	    })
	};})})
	//PUT to update a setlist by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
	    var songArray = req.body.songArray;

	    //find the document by ID
	    mongoose.model('Setlist').findById(req.id, function (err, setlist) {
	        //update it
	        setlist.update({
            //"$addToSet" : { "songArray" :  songArray}
	            songArray: songArray
	        }, function (err, setlistID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/setlists/" + setlist._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(setlist);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Setlist by ID
	.delete(function (req, res){
	    //find setlist by ID
	    mongoose.model('Setlist').findById(req.id, function (err, setlist) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            setlist.remove(function (err, setlist) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + setlist._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/setlists");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : setlist
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
