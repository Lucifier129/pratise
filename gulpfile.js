var gulp = require('gulp');
var react = require('gulp-react')
var amdOptimize = require("amd-optimize")
var amdConfig = require('./amd.config')
var concat = require('gulp-concat')
var uglify = require("gulp-uglify")
var webpack = require('gulp-webpack')
var webpackConfig = require('./webpack.config.js')
var Promise = require('es6-promise').Promise

var task = {
	'jsx': [{
		src: './routes_jsx/*.js',
		dest: './routes'
	}, {
		src: './static/jsx/*.js',
		dest: './static/js'
	}],
	'build': {
		app: './public/js'
	}
}

function hanldePromiseList(promiseList, message) {
	var total = promiseList.length
	var promise

	if (total === 0) {
		promise = Promise.resolve('nothing')
	} else if (total === 1) {
		promise = promiseList[0]
	} else if (total >= 2) {
		promise = Promise.all(promiseList)
	}

	return promise.then(function() {
		console.log(message || 'done')
	}).catch(function(err) {
		console.log(err)
	})
}


gulp.task('jsx', function() {
	var promiseList = []
	task.jsx.forEach(function(item) {
		var promise = new Promise(function(resolve, reject) {
			gulp.src(item.src)
				.pipe(react())
				.pipe(gulp.dest(item.dest))
				.on('end', resolve)
				.on('error', reject)
		})
		promiseList.push(promise)
	})

	return hanldePromiseList(promiseList, 'jsx task done')

})

gulp.task('build', ['jsx'], function() {
	var promiseList = []

	Object.keys(webpackConfig.entry).forEach(function(key) {
		var promise = new Promise(function(resolve) {
			gulp.src(webpackConfig.entry[key][0])
				.pipe(webpack(webpackConfig))
				.pipe(uglify())
				.pipe(gulp.dest(task.build[key]))
				.on('end', resolve)
				.on('error', reject)
		})
		promiseList.push(promise)
	})

	return hanldePromiseList(promiseList, 'build task done')
})


//Rerun the task when a file changes
gulp.task('watch', function() {
	var jsx_src = task.jsx.map(function(item) {
		return item.src
	})
	var watcher = gulp.watch(jsx_src, ['jsx'])
	watcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
})



gulp.task('default', ['jsx', 'build', 'watch'])