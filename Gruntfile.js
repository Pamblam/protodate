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
		'src/toDate.js',
		'src/fromDate.js'
	];
	
	var ts_src_files = [
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
				src: [...src_files,'src/export.js'],
				dest: 'protodate.js',
			},
			tz1: {
				options: {
					banner: '/**\n * <%= pkg.name %> (timezones 2012-2022) - v<%= pkg.version %>' +
							'\n * <%= pkg.description %>' +
							'\n * @author <%= pkg.author %>' +
							'\n * @website <%= pkg.homepage %>' +
							'\n * @license <%= pkg.license %>' +
							'\n */\n\n'
				},
				src: [...src_files,'src/timezones/data/tzdata-2012-2022.js',...ts_src_files,'src/export.js'],
				dest: 'protodate.tz.js',
			},
			tz2: {
				options: {
					banner: '/**\n * <%= pkg.name %> (timezones 1835-2500) - v<%= pkg.version %>' +
							'\n * <%= pkg.description %>' +
							'\n * @author <%= pkg.author %>' +
							'\n * @website <%= pkg.homepage %>' +
							'\n * @license <%= pkg.license %>' +
							'\n */\n\n'
				},
				src: [...src_files,'src/timezones/data/tzdata-1835-2500.js',...ts_src_files,'src/export.js'],
				dest: 'protodate.tz.full.js',
			}
		},
		'string-replace': {
			source: {
				files: {
					"protodate.js": "protodate.js",
					"protodate.tz.js": "protodate.tz.js",
					"protodate.tz.full.js": "protodate.tz.full.js"
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
						pattern: /v\d+.\d+.\d+/g,
						replacement: 'v<%= pkg.version %>'
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
			tz1: {
				options: {
					banner: '/*! <%= pkg.name %> (+timezones) - v<%= pkg.version %> */'
				},
				src: 'protodate.tz.js',
				dest: 'protodate.tz.min.js'
			},
			tz2: {
				options: {
					banner: '/*! <%= pkg.name %> (+timezones) - v<%= pkg.version %> */'
				},
				src: 'protodate.tz.full.js',
				dest: 'protodate.tz.full.min.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	
	grunt.registerTask('default', [
		'concat:lite',
		'concat:tz1',
		'concat:tz2',
		'string-replace',
		'uglify:lite',
		'uglify:tz1',
		'uglify:tz2'
	]);
	
};