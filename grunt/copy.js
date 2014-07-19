'use strict';

module.exports = {
	main : {
		files : [ 
			{ expand : true,
			  dot : true,
			  cwd : '<%= vars.srcPath %>/assets/image',
			  dest : '<%= vars.buildPath %>/assets/image',
			  src : [ '*.*','*/*.*'] 
			},
			{
				expand : true,
				dot : true,
				cwd : '<%= vars.srcPath %>/assets/data',
				dest : '<%= vars.buildPath %>/assets/data',
				src : [ '*.*','*/*.*']
			},
			{
				expand : true,
				dot : true,
				cwd : '<%= vars.srcPath %>/assets/css',
				dest : '<%= vars.buildPath %>/assets/css',
				src : [ '*.css','*/**/*.png']
			},
			{
				expand : true,
				dot : true,
				cwd : '<%= vars.srcPath %>/js',
				dest : '<%= vars.buildPath %>/js',
				src : [ '*.*','*/**/*.*']
			},
			
			{
				expand : true,
				dot : true,
				cwd : '<%= vars.srcPath %>',
				dest : '<%= vars.buildPath %>',
				src : [ '*.html']
			},
			{ expand : true,
				  dot : true,
				  cwd : '<%= vars.srcPath %>/assets/ico',
				  dest : '<%= vars.buildPath %>/assets/ico',
				  src : [ '*.ico'] 
				},
			
			
		]
	}
}
	