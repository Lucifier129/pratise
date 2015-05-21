var fs = require('fs')
var express = require('express')
var router = express.Router()
var Promise = require('es6-promise').Promise
var React = require('react')
var Model = require('../public/js/src/todomvc/model')
var View = require('../public/js/src/todomvc/component/view')
var util = require('util')
var request = require('superagent')

function getDb() {
	return new Promise(function(resolve, reject) {
		fs.readFile('./database/db.json', function(err, data) {
			if (err) {
				return reject(err)
			}
			resolve(JSON.parse(data))
		})
	})
}

function getComponent() {
	return getDb().then(function(data) {
		var todos = {}
		data.todos.forEach(function(todo) {
			todos[todo.id] = todo
		})
		var model = new Model(todos)
		var data = model.getData('/')
		var component = React.renderToString(React.createElement(View, data))
		return {
			component: component,
			initialData: JSON.stringify(data)
		}
	})
}

router.get('/', function(req, res) {
	getComponent().then(res.render.bind(res, 'todomvc'), console.error.bind(console))
})

router.get('/clearCompleted', function(req, res) {
	getDb().then(function(data) {
		var todos = data.todos
		for (var i = todos.length - 1; i >= 0; i--) {
			var todo = todos[i]
			if (todo.completed) {
				todos.splice(i, 1)
			}
		}
		res.send({
			errno:0
			data: todos
		})
	})
})

router.post('/toggle', function(req, res) {
	getDb().then(function(data) {
		data.todos.forEach(function(todo) {
			todo = req.body.completed
		})
	})
})


module.exports = router