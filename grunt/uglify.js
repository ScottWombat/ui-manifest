'use strict';

module.exports = {
		
  options: {
	  banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
	  sourceMap: true
    },
    dist: {
      files: {
    	  '<%= vars.buildPath %>/app1.min.js': ['./temp/test1.js','./temp/test2.js']
      }
    },
    bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/bower.min.js': 'js/bower.js'
        }
      }
};

