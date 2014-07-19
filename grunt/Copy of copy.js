'use strict';

module.exports = {
	image : {
		files : [ {
			expand : true,
			dot : true,
			cwd : '<%= vars.srcPath %>/assets/image',
			dest : '<%= vars.buildPath %>/assets/image',
			src : [ '*.*','*/*.*']
		} ]
	},
	data : {
		files : [ {
			expand : true,
			dot : true,
			cwd : '<%= vars.srcPath %>/assets/data',
			dest : '<%= vars.buildPath %>/assets/data',
			src : [ '*.*','*/*.*']
		} ]
	},
	css : {
		files : [ {
			expand : true,
			dot : true,
			cwd : '<%= vars.srcPath %>/assets/css',
			dest : '<%= vars.buildPath %>/assets/css',
			src : [ '*.*','*/**/*.*']
		} ]
	},
	html:{
		files : [ {
			expand : true,
			dot : true,
			cwd : '<%= vars.srcPath %>',
			dest : '<%= vars.buildPath %>',
			src : [ '*.*','*/**/*.html']
		} ]
	}
}