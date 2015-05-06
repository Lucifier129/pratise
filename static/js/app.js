var React = require('react')
var Body = require('./body')

if (typeof window !== 'undefined') {
	var initialData = JSON.parse(document.getElementById('initialData').innerHTML)
	React.render(React.createElement(Body, {data: initialData}), document.getElementById('container'))
	setTimeout(function() {
		React.render(React.createElement(Body, {data: {data: 'client React done'}}), document.getElementById('container'))
	}, 3000)
} else {
	module.exports = function(initialData) {
		return React.renderToString(React.createElement(Body, {data: initialData}))
	}
}