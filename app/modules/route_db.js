var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({

	routes			:{
		id			: String,
		source		: String,
		destination	: String,
		waypoints	: String
	}
});


routeSchema.methods.getId = function(){
	return this.routes.id;
};

module.exports = mongoose.model('Route', routeSchema);
