var utils = require('./utils'),
    path = require('path');

module.exports.pageSetter = function (req, res, next){

  var url = req.url,
      page = path.basename(url)

  res.locals.current = page;

  next();  
}


module.exports.navbar = function (req, res, next){

  var config = utils.scope;
 
  res.locals.general = config.general;
  res.locals.pages = config.pages;
  res.locals.projects = config.projects;

  
  // pass to client
  res.projects = config.projects;
  res.custom = config.pages;

  next();
}