var gulp = require('gulp');
var react = require('gulp-react')
var concat = require('gulp-concat')
var uglify = require("gulp-uglify")
var webpack = require('gulp-webpack')
var Promise = require('es6-promise').Promise
var webpackConfig = require('./webpack.config.js')

var task = {
    'jsx': {
        server: {
            src: './routes_jsx/*.js',
            dest: './routes'
        },
        client: {
            src: './static/jsx/*',
            dest: './static/js'
        }
    },
    'build': {
        app: {
            dev: './static',
            dest: './public/js'
        }
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


gulp.task('server_jsx', function() {
    return gulp.src(task.jsx.server.src)
    .pipe(react())
    .pipe(gulp.dest(task.jsx.server.dest))
})

gulp.task('client_jsx', function() {
    return gulp.src(task.jsx.client.src)
    .pipe(react())
    .pipe(gulp.dest(task.jsx.client.dest))
})

//打包文件
gulp.task('build', ['client_jsx'], function() {
    var promiseList = []

    Object.keys(webpackConfig.entry).forEach(function(key) {
        var promise = new Promise(function(resolve, reject) {
            gulp.src(webpackConfig.entry[key][0])
                .pipe(webpack(webpackConfig))
                .pipe(gulp.dest(task.build[key].dev))
                .pipe(uglify())
                .pipe(gulp.dest(task.build[key].dest))
                .on('end', resolve)
                .on('error', reject)
        })
        promiseList.push(promise)
    })

    return hanldePromiseList(promiseList, 'build task done')
})


//Rerun the task when a file changes
gulp.task('watch', function() {
    var tasks = []

    tasks.push({
    	src: task.jsx.server.src,
    	taskName: 'server_jsx'
    })

    tasks.push({
    	src: task.jsx.client.src,
    	taskName: 'client_jsx'
    })

    tasks.push({
    	src: webpackConfig.entry.app[0],
    	taskName: 'build'
    })

    tasks.forEach(function(item) {
    	var watcher = gulp.watch(item.src, [].concat(item.taskName))
    	watcher.on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        })
    })
})

gulp.task('default', ['server_jsx', 'client_jsx', 'build', 'watch'])
