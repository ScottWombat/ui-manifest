'use strict';

module.exports = function(grunt) {

	var path = require('path');
	
	 var vars = {
				buildPath : 'build/wwwroot',
				srcPath   : 'public/app',
				bowerPath : 'bower_components',
				buildLibPath : 'build/wwwroot/assets/libs'
		    };

    require('load-grunt-config')(grunt, {
    
    	config : {
    		vars:vars
    	},
        configPath: path.join(process.cwd(), 'grunt'), // path to task.js
														// files, defaults to
														// grunt dir
        init: true, // auto grunt.initConfig
        data: { // data passed into config. Can use with <%= test %>
            test: false
        },
        loadGruntTasks: { // can optionally pass options to load-grunt-tasks.
							// If you set to false, it will disable auto loading
							// tasks.
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });
    require('time-grunt')(grunt);
    
    
    grunt.registerTask('bower', 'Install bower dependencies', function() {
        var bower = require('bower'),
            done = this.async();
        bower.commands.install().on('log', function(result) {
            grunt.log.writeln('bower ' + result.id + ' ' + result.message);
        }).on('error', function() {
            done(false);
        }).on('end', function(results) {
            done();
        });
    });
    
    grunt.registerTask('copy-all', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['copy:image','copy:data','copy:css','copy:html']);
    });
    
	grunt.registerTask('default', ['clean','mkdir','copy-all','bower_concat'

	]);
	
	
	

    
    grunt.registerTask('copy-all', [ 'copy:image', 'copy:data','copy:css','copy:html']);
    
    grunt.registerTask('run', ['clean',
                                   'mkdir',
                                   'copy',
                                   'express',
	                               'open',
	                               'watch']);
    
    grunt.registerTask('build', ['clean',
                                 'copy',
                                 'bowercopy',
                                 'express',
                                 'open',
                                 'watch']);
};
