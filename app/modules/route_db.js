var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({

	routes			:{
		id			: String,
		source		: String,
		destination	: String,
		waypoints : { type : Array , "default" : [] }
	}
});


routeSchema.methods.getId = function(){
	return this.routes.id;
};

module.exports = mongoose.model('Route', routeSchema);
