var express = require('express'),
    router = express.Router();

var cheerio = require('cheerio');


var interceptor = require('express-interceptor');

router.use(interceptor(function(req, res){
    console.log(  "Requested url is----------->>   " + req.originalUrl);

  return {
    isInterceptable: function(){
      return false;
    },
    intercept: function(body, send) {
      var $document = cheerio.load(body || '');
      $document('body p').append(' from interceptor!');

      send($document.html());
    }
  };
}));


module.exports = router;
