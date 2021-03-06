
require('./../common');

var agent = require('superagent')
  , express = require('express')
  , app = express.createServer();

app.post('/', function(req, res){
  var buf = '';
  req.headers.should.have.property('content-length', '7');
  req.headers.should.have.property('content-type', 'application/x-www-form-urlencoded');
  req.on('data', function(chunk){ buf += chunk; });
  req.on('end', function(){
    buf.should.equal('foo=bar');
    app.close();
  });
  res.end();
});

app.listen(3000, function(){
  agent
    .post('http://localhost:3000')
    .form({ foo: 'bar' });
});
