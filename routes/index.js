var express = require('express')
var router = express.Router()
var React = require('react')
var util = require('util')

var Body = React.createClass({displayName: "Body",
	render: function() {
		return (
			React.createElement("h1", {className: "head"}, this.props.children)
			)
	}
})

var initialData = {
	data: 'a string body create by React.js from server'
}

var body = React.renderToString(React.createElement(Body, null, initialData.data))




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	title: 'test react server render',
  	body: body,
  	initialData: JSON.stringify(initialData)
  })
})

module.exports = router
