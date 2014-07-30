var mongoose = require('mongoose');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';
mongoose.connect(uristring);

var models = require('./models')(mongoose);

exports.models = function() {
  
  return models;
};