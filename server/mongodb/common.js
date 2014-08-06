var mongoose = require('mongoose');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';
mongoose.connect(uristring);

//var models = require('./models')(mongoose);

//exports.models = function() {
 // return models;
//};
//module.exports = function(){
	//return models;
//}

//exports.User = models.User;
var Schema = mongoose.Schema;
var User     = new Schema({
	id					: Schema.ObjectId,
	email               :    {type: String, index: true},
	pwd                :    {type: String}
});

var models = {
	      Materials : mongoose.model('Materials', Material),
	      SeatCovers : mongoose.model('SeatCovers', SeatCover)};
	    return models;