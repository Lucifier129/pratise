var fs = require('fs')
var express = require('express')
var router = express.Router()
var Promise = require('es6-promise').Promise
var React = require('react')
var Model = require('../public/js/src/todomvc/model')
var View = require('../public/js/src/todomvc/component/view')
var util = require('util')

function getComponent(path) {
	return new Promise(function(resolve, reject) {
		fs.readFile('./database/db.json', function(err, data) {
			if (err) {
				return reject(err)
			}
			var todos = JSON.parse(data).todos
			var model = new Model(todos)
			var data = model.getData(path)
			var component = React.renderToString(React.createElement(View, data))
			resolve({
				component: component,
				initialData: JSON.stringify(data)
			})
		})
	})
}

router.get('/', function(req, res) {

	getComponent('/')
		.then(function(data) {
			res.render('todomvc', data)
		}, function(err) {
			console.error(err)
		})
})


module.exports = router