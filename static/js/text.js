var React = require('react')

module.exports = React.createClass({displayName: "exports",
	render: function() {
		return React.createElement("p", {className: "text"}, this.props.children)
	}
})
