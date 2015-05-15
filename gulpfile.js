var gulp = require('gulp');
var uglify = require("gulp-uglify")
var webpack = require('gulp-webpack')
var Promise = require('es6-promise').Promise
var webpackConfig = require('./webpack.config.js')
var path = require('path')

var buildConfig = {
    src: 'public/js/src',
    dest: 'public/js/dest'
}

var watchConfig = {
    src: ['public/js/src/*.js', 'public/js/src/**/*.js'],
    task: ['build']
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

//打包文件
gulp.task('build', function() {
    var promiseList = []
    var entryKeys = Object.keys(webpackConfig.entry)

    entryKeys.forEach(function(key) {
        var promise = new Promise(function(resolve, reject) {
            gulp.src(webpackConfig.entry[key][0])
                .pipe(webpack(webpackConfig))
                .pipe(gulp.dest(buildConfig.src))
                .pipe(uglify())
                .pipe(gulp.dest(buildConfig.dest))
                .on('end', resolve)
                .on('error', reject)
        })
        promiseList.push(promise)
    })

    return hanldePromiseList(promiseList, 'build task done')
})


gulp.task('default', ['build'], function() {
    var watcher = gulp.watch(watchConfig.src, watchConfig.task)
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})