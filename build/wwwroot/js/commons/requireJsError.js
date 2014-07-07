requirejs.onError = function(err) {
		console.log('An error occured somewhere inside RequireJS. Explore it below.');
		console.dir(err);
		if (err.requireModules) {
			var moduleId = err.requireModules[0];
			var msg = err.message;
			console.log('Error while loading module "%s": "%s".', moduleId,msg);
		}
		throw err;
};