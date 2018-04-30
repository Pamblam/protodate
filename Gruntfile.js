module.exports = function(grunt) {
	
	var pkg = grunt.file.readJSON('package.json');
	pkg.version = pkg.version.split(".");
	var subversion = pkg.version.pop();
	subversion++;
	pkg.version.push(subversion);
	pkg.version = pkg.version.join(".");
	grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
	
	console.log("---------------------------------------");
	console.log("  Building protodate Version "+pkg.version);
	console.log("---------------------------------------");
	
	var src_files = [
		'src/constants.js',
		'src/getUnixTimestamp.js',
		'src/isDate.js',
		'src/format.js',
		'src/validateFormat.js',
		'src/parse.js',
		'src/elapsedSince.js',
		'src/minus.js',
		'src/plus.js',
		'src/guessFormat.js',
		'src/export.js'
	];
	
	var ts_src_files = [
		'src/timezones/data/tzdata.js',
		'src/timezones/getTZInfo.js',
		'src/timezones/setTimezone.js',
		'src/timezones/getTimezone.js',
		'src/timezones/isDST.js',
		'src/timezones/isDSTObserved.js'
	];
	
	grunt.initConfig({
		pkg: pkg,
		concat: {
			lite: {
				options: {
					banner: '/**\n * <%= pkg.name %> (lite) - v<%= pkg.version %>' +
							'\n * <%= pkg.description %>' +
							'\n * @author <%= pkg.author %>' +
							'\n * @website <%= pkg.homepage %>' +
							'\n * @license <%= pkg.license %>' +
							'\n */\n\n'
				},
				src: [...src_files],
				dest: 'protodate.js',
			},
			tz: {
				options: {
					banner: '/**\n * <%= pkg.name %> (timezones+) - v<%= pkg.version %>' +
							'\n * <%= pkg.description %>' +
							'\n * @author <%= pkg.author %>' +
							'\n * @website <%= pkg.homepage %>' +
							'\n * @license <%= pkg.license %>' +
							'\n */\n\n'
				},
				src: [...src_files,...ts_src_files],
				dest: 'protodate.tz.js',
			}
		},
		'string-replace': {
			source: {
				files: {
					"protodate.js": "protodate.js",
					"protodate.tz.js": "protodate.tz.js"
				},
				options: {
					replacements: [{
						pattern: /{{ VERSION }}/g,
						replacement: '<%= pkg.version %>'
					}]
				}
			},
			readme: {
				files: {
					"README.md": "README.md"
				},
				options: {
					replacements: [{
						pattern: /\d+.\d+.\d+/g,
						replacement: '<%= pkg.version %>'
					}]
				}
			}
		},
		uglify: {
			lite: {
				options: {
					banner: '/*! <%= pkg.name %> (lite) - v<%= pkg.version %> */'
				},
				src: 'protodate.js',
				dest: 'protodate.min.js'
			},
			tz: {
				options: {
					banner: '/*! <%= pkg.name %> (+timezones) - v<%= pkg.version %> */'
				},
				src: 'protodate.tz.js',
				dest: 'protodate.tz.min.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', [
		'concat:lite',
		'concat:tz',
		'string-replace',
		'uglify:lite',
		'uglify:tz'
	]);
	
};