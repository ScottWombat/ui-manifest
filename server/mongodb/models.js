module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var SessionToken = new Schema({
		Token 				: {type:String,index:true},
		id					: Schema.ObjectId,
		email				: String
	});
	var Material = new Schema({
        name                :    {type: String, index: true},
        id                  :    Schema.ObjectId,
        materialId          :    String,
        surcharge           :    String,
        colors              :    {
            colorName       :    String,
            colorId         :    String,
            surcharge       :    Number
        },
        Seat				: [{type: Schema.ObjectId, ref: 'Seat'}]
    });
	var SeatCover = new Schema({
	    ItemName            :    {type: String, index: true},
	    ItemId              :    Schema.ObjectId,
	    Pattern             :    String,
	    Categories          :    {
	        year            :    {type: Number, index: true},
	        make            :    {type: String, index: true},
	        model           :    {type: String, index: true},
	        body            :    {type: String, index: true}
	    },
	    Description         :    String,
	    Specifications      :    String,
	    Price               :    String,
	    Cost                :    String,
	    Pattern             :    String,
	    ImageUrl            :    String,
	    Materials           :    [{type: Schema.ObjectId, ref: 'Material'}]
	});
	
	 var models = {
		      Materials : mongoose.model('Materials', Material),
		      SeatCovers : mongoose.model('SeatCovers', SeatCover),
		      SessionToken : mongoose.model('SessionToken', SessionToken)
	 };
	return models;
}