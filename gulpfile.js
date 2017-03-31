'use strict';

var gulp = require('gulp');
var html2md = require('to-markdown');
var converter = require('./converter');

/* Default task to convert HTML to markdown + additional data points */
gulp.task('html2md', function(callback){
	var stream = gulp.src('source/*.html')
		.pipe(converter())
		.pipe(gulp.dest('output'))
	return stream;
})

gulp.task('default', ['html2md']);

