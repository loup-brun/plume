module.exports = function ( grunt ) {

	// Take care of all Grunt plugins in a single line
	require('load-grunt-tasks')(grunt);

	// This is the configuration object Grunt uses to give each plugin its instructions.
	grunt.initConfig({
		// We read in our `package.json` file so we can access the package name and version. It's already there, so we don't repeat ourselves here.

		pkg: grunt.file.readJSON("package.json"),

		assets_path: 'assets/',
		css_path: '<%= assets_path %>css/',
		js_path: '<%= assets_path %>js/',
		templates_path: '<%= assets_path %>templates/',
		
		/*
		handlebars: {
			templates: {
				files: {
					'<%= assets_path %>js/templates.js': [
						//'<%= assets_path %>templates/detail.handlebars', 
						'<%= assets_path %>templates/list.handlebars'
					] 
				}
			}
		},
		*/

		/*
		handlebars: {
			compile: {
				options: {
					namespace: "Handlebars.templates"
				},
				files: {
					'<%= js_path %>js/templates.js': [
						'<%= templates_path %>detail.handlebars', 
						'<%= templates_path %>list.handlebars'
					] 
				}
			}
		},
		*/
		sass: {
			build: {
				files: {
					'<%= css_path %>main.css': '<%= css_path %>src/*.scss'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		//Minify the sources
		uglify: {
			js: {
				files: [{
					'<%= js_path %>custom.min.js': [
						//'lib/jquery/dist/jquery.js',
						//'lib/underscore/underscore.js',
						'<%= js_path %>src/*.js'
					],
					//expand: true
				}]
			}
		},
		
		copy: {
			assets: {
				files: [
					{
						cwd: '',
						src: [],
						dest: '',
						expand: true
					}
				]
			}
		},

		jshint: {
			files: {
				//src: ['<%= js_path %>*.js'],
				src: ['<%= js_path %>src/main.js'],
			},
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			}
		},
		
		watch: {
			sass: {
				files: ['<%= css_path %>/src/**/*.scss'],
				tasks: ['sass:build']
			}
		}

	});

	/**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
	//grunt.renameTask( 'watch', 'delta' );
	//grunt.registerTask( 'watch', [ 'build', 'delta' ] );

	/**
   * The default task is to build and compile.
   */
	grunt.registerTask( 'default', [ 'build' ] );

	grunt.registerTask( 'build', [
		'sass:build',
		'uglify'
	]);

	// A utility function to get all app JavaScript sources.
	function filterForJS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.js$/ );
		});
	}

	// A utility function to get all app CSS sources.
	function filterForCSS ( files ) {
		return files.filter( function ( file ) {
			return file.match( /\.css$/ );
		});
	}


};
