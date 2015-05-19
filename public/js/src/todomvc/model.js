export default class Model {
	constructor(todos) {
		this.todos = todos
	}
	getTodos() {
		return this.todos
	}
	addTodo(title) {
		let now = new Date()
		let todo = {
			id: now.getTime(),
			title: title,
			time: now.toLocaleDateString(),
			completed: false
		}
		this.todos[todo.id] = todo
		return todo
	}
	getTodo(id) {
		return this.todos[id]
	}
	removeTodo(id) {
		return delete this.todos[id]
	}
	updateTodo(newTodo) {
		let todo = this.getTodo(newTodo.id)
		if (todo) {
			Object.assign(todo, newTodo)
		}
	}
	eachTodo(handle) {
		let todos = this.getTodos()
		Object.keys(todos).forEach((id) => handle(todos[id], id, todos))
	}
	clearCompleted() {
		this.eachTodo((todo, id, todos) => {
			if (todo.completed) {
				delete todos[id]
			}
		})
	}
	getCompleted() {
		let result = {}
		this.eachTodo((todo, id) => {
			if (todo.completed) {
				result[id] = todo
			}
		})
		return result
	}
	getActive() {
		let result = {}
		this.eachTodo((todo, id) => {
			if (!todo.completed) {
				result[id] = todo
			}
		})
		return result
	}
	setStateForAll(state) {
		let todos = this.getTodos()
		console.log(todos)
		Object.keys(todos).forEach((id) => todos[id].completed = state)
	}
	getData(hash) {
		let mapping = {
			'/': 'getTodos',
			'/active': 'getActive',
			'/completed': 'getCompleted'
		}
		return {
			hash: hash,
			completedCount: this.getCompleted().length,
			todoCount: this.getActive().length,
			todos: this[mapping[hash]]()
		}
	}
}