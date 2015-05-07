var React = require('react')
var mui = require('material-ui')
var DatePicker = mui.DatePicker
var FontIcon = mui.FontIcon
var Slider = mui.Slider
var FlatButton = mui.FlatButton
var RaisedButton = mui.RaisedButton
var FloatingActionButton = mui.FloatingActionButton
var Dialog = mui.Dialog
var Paper = mui.Paper
var TextField = mui.TextField
var DropDownMenu = mui.DropDownMenu
var Snackbar = mui.Snackbar

var menuItems = [
   { payload: '1', text: 'Never' },
   { payload: '2', text: 'Every Night' },
   { payload: '3', text: 'Weeknights' },
   { payload: '4', text: 'Weekends' },
   { payload: '5', text: 'Weekly' },
];





var Body = React.createClass({displayName: "Body",
	render: function() {
		return (
			React.createElement("div", null, 
			React.createElement(Slider, {name: "slider1"}), 
			React.createElement(DropDownMenu, {menuItems: menuItems}), 
			React.createElement(DatePicker, {
  hintText: "Landscape Dialog", 
  mode: "landscape"})
			)
			)
	}
})


module.exports = Body