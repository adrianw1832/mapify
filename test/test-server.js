var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Tweets', function() {
  it('should list ALL tweets on /tweets GET', function(done) {
    chai.request(server)
      .get('/tweets')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});

