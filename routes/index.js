var express = require('express')
var router = express.Router()
var React = require('react')
var util = require('util')

var initialDataString = require('./initialData.json')

var Body = React.createClass({displayName: "Body",
	render: function() {
		return (
			React.createElement("h1", {className: "head"}, this.props.children)
			)
	}
})

var initialData = JSON.parse(initialDataString)
var body = React.renderToString(React.createElement(Body, null, initialData.data))
var initialDataScript= React.createElement("script", {id: "initialData", type: "text/json"}, initialDataString)


/* GET home page. */
router.get('/', function(req, res) {
	var data = {
		title: 'test react server render',
		body: body,
		initialData: React.renderToStaticMarkup(initialDataScript)
	}
	console.log(data)
	res.render('index', data)
})

module.exports = router
