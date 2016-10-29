process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Songs', function() {
  // // Song.collection.drop();
  // 
  // beforeEach(function(done){
  //   var newSong = new Song({
  //     name: 'Free Bird',
  //     artist: 'Lynard Skynard',
  //     chart: '--song chart--'
  //   });
  //   newSong.save(function(err) {
  //     done();
  //   });
  // });
  // afterEach(function(done){
  //   // Song.collection.drop();
  //   done();
  // });

  it('should list ALL songs on /songs GET', function(done) {
  chai.request(server)
    .get('/songs')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.html;
      res.body.should.be.a('object');
      done();
    });
  });
  it('should list a SINGLE song on /song/<id> GET');
  it('should add a SINGLE song on /songs POST');
  it('should update a SINGLE song on /song/<id> PUT');
  it('should delete a SINGLE song on /song/<id> DELETE');
});
