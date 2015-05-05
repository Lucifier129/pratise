var React = require('react')

module.exports = React.createClass({
	render: function() {
		return <p className="text">{this.props.children}</p>
	}
})
