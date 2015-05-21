import todoDispatcher from './todoDispatcher'
var actions =  {
	addTodo: function(title) {
		todoDispatcher.dispatch({
			actionType: 'addTodo',
			title: title
		})
	},
	toggleAll: function(completed) {
		todoDispatcher.dispatch({
			actionType: 'toggleAll',
			completed: completed
		})
	},
	updateTodo: function(todo) {
		todoDispatcher.dispatch({
			actionType: 'updateTodo',
			todo: todo
		})
	},
	removeTodo: function(id) {
		todoDispatcher.dispatch({
			actionType: 'removeTodo',
			id: id
		})
	},
	clearCompleted: function() {
		todoDispatcher.dispatch({
			actionType: 'clearCompleted'
		})
	}
}

export default actions