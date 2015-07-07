var express = require('express'),
    utils   = require('../utils')
    
var router = express.Router();

// Home
router.get('/', function (req, res){

  var contents = {
    format:{
      collection: utils.getHighlights(),
      developers: utils.getDevs(),
      frame:false,
      custom:false
    }
  }
  res.render('index.jade', contents);
})

// Custom Pages
router.get('/:custom', function (req, res){

  var contents = {
    format: {
      collection: false,
      developers: false,
      frame: false,
      custom: res.locals.pages[res.locals.current]
    }
  }
    
  if(res.locals.pages[res.locals.current]) {

    res.render('index.jade', contents);

  } else {

    res.redirect('/')
  }
})

// Project Category Pages
router.get('/projects/:category', function (req, res){

  var contents = {
    format: {
      collection: utils.sortProjects(req.params.category, res.projects),
      developers: utils.getDevs(),
      custom: false,
      frame: false
    }
  }
  res.render('index.jade', contents);
})


module.exports = router;
