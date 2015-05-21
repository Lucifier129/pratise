import request from 'superagent'

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
		this.todos.push(todo)
		request.post('/todos').send(todo).end(console.log.bind(console))
	}
	find (query) {
			var result = []
			var todo
			this.todos.forEach(function(todo) {
				if (todo[query.name] == query.value) {
					result.push(todo)
				}
			})
			return result
	}
	getTodo(id) {
		for (var i = Things.length - 1; i >= 0; i--) {
			Things[i]
		};
		return this.todos[id]
	}
	removeTodo(id) {
		request.del('/todos/' + id).end()
		return delete this.todos[id]
	}
	updateTodo(newTodo) {
		let todo = this.getTodo(newTodo.id)
		if (todo) {
			Object.assign(todo, newTodo)
			request.patch('/todos/' + todo.id).send(todo).end(console.log.bind(console))
		}
	}
	eachTodo(handle) {
		let todos = this.getTodos()
		Object.keys(todos).forEach((id) => handle(todos[id], id, todos))
	}
	clearCompleted(handle) {
		this.eachTodo((todo, id, todos) => {
			if (todo.completed) {
				this.removeTodo(id)
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
		Object.keys(todos).forEach((id) => {
			let todo = todos[id]
			todo.completed = state
			request.patch('/todos/' + todo.id).send(todo).end(console.log.bind(console))
		})
	}
	getData(hash) {
		let mapping = {
			'/': 'getTodos',
			'/active': 'getActive',
			'/completed': 'getCompleted'
		}
		return {
			hash: hash,
			completedCount: Object.keys(this.getCompleted()).length,
			todoCount: Object.keys(this.getActive()).length,
			todos: this[mapping[hash]]()
		}
	}
}