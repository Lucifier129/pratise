var React = require('react')
var Body = require('./body')

if (typeof window !== 'undefined') {
	var initialData = JSON.parse(document.getElementById('initialData').innerHTML)
	React.render(<Body data={initialData} />, document.getElementById('container'))
	setTimeout(function() {
		React.render(<Body data={{data: 'client React done'}} />, document.getElementById('container'))
	}, 3000)
} else {
	module.exports = function(initialData) {
		return React.renderToString(<Body data={initialData} />)
	}
}