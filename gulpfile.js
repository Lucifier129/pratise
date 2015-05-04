var gulp = require('gulp');
var react = require('gulp-react')


gulp.task('jsx', function() {
	var stream = gulp.src('./routes_jsx/*.js')
	stream.pipe(react()).pipe(gulp.dest('./routes'))
	return stream
})


// Rerun the task when a file changes
gulp.task('watch', function() {
	var watcher = gulp.watch('./routes_jsx/*.js', ['jsx'])
	watcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
})



gulp.task('default', ['jsx', 'watch'])