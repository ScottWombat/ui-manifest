module.exports = function(mongoose) {
	var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/manifest';
	mongoose.connect(uristring);
	mongoose.set('debug, true');
	var db = mongoose.connection;
	
	db
	  .on('error', console.error.bind(console, 'DB connection error.'))
	  .once('open', console.log.bind(console, 'DB Connection established.'));
	
    var Schema = mongoose.Schema;
	var UserInfo     = new Schema({
		id					: Schema.ObjectId,
		email               :    {type: String, index: true},
		pwd                :    {type: String}
	});

    
    // declare seat covers here too
    var models = {
      UserInfo : mongoose.model('UserInfo', UserInfo)
     
    };
    return models;
}