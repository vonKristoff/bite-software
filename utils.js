var fs = require('fs'),
    scope = require('./scope.json')

module.exports = {
  scope: scope
}

module.exports.sortProjects = function (category, projects){
  
  var filtered = [];

  Object.keys(projects).forEach(function (key){

    if(projects[key].type === category){
      filtered.push(projects[key])
    }

    // console.log(key);       // property
    // console.log(projects[key].type);  // value
  });

  return filtered
}


// Sanitising forms

module.exports.generalise = function (form, current){
  
  this.email = (form['general-email'] != '') ? form['general-email'] : current.email;
  this.twitter = (form['general-twitter'] != '') ? form['general-twitter'] : current.twitter;
  this.github = (form['general-github'] != '') ? form['general-github'] : current.github;
  this.ga = (form['general-ga'] != '') ? form['general-ga'] : current.ga;
  this.available = (form['general-available-yes'] != 'yes') ? true : current.available;

  return this
}

module.exports.pageify = function (form){
  
  this.title = form['page-title'];
  this.icon = form['page-icon'];
  this.iframe = form['page-iframe'];
  this.chrome = (form['page-chrome'] === 'true') ? true : false;
  this.route = (form['page-type'] != 'category') ? '/' + form['page-title'].toLowerCase() : '/projects/' + form['page-title'].toLowerCase();
  this.category = (form['page-type'] === 'category') ? true : false;

  return this
}

module.exports.Project = function (form, files){

  // var upload = (typeof req.files.image_file != 'undefined') ? req.files.image_file.name : false;

  this.title = (form['project-title'] != undefined) ? form['project-title']: '';
  this.type = (form['project-type'] != undefined) ? form['project-type']: '';
  this.iframe = (form['project-iframe'] != undefined) ? form['project-iframe']: '';
  this.description = '';
  this.repo = (form['project-repo'] != undefined) ? form['project-repo']: '';
  this.tweet = (form['project-twitter'] != undefined) ? form['project-twitter']: '';
  this.ga = (form['project-ga'] != undefined) ? form['project-ga']: '';

  return this

}

module.exports.getHighlights = function (){
  var homepage = [],
      tgt = this.scope.projects;
  Object.keys(tgt).forEach(function (key, index){
    if(tgt[key].homepage) homepage.push(tgt[key])
  })
  return homepage
}

module.exports.getDevs = function (){
  var devs = [],
      tgt = this.scope.developers;
  Object.keys(tgt).forEach(function (key, index){
    if(tgt[key].name) devs.push(tgt[key])
  })
  return devs
}