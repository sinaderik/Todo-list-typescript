type Todo = {
  id: string,
  title: string,
  isComplete: boolean
}

const list = document.querySelector<HTMLUListElement>('#list')!
const form = document.querySelector<HTMLFormElement>('#new-todo-form')!
const inputTodo = document.querySelector<HTMLFormElement>('#todo-input')!

let todos = loadTodos()
todos.forEach(item => {
  renderTodos(item)
})

form.addEventListener('submit', (e => {
  e.preventDefault()

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: inputTodo.value,
    isComplete: false
  }
  todos.push(newTodo)
  saveTodos()

  renderTodos(newTodo)
  inputTodo.value = ""
}))


function renderTodos(todo: Todo) {

  let li = document.createElement('li')
  li.classList.add('list-item')

  let checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.classList.add('label-input')
  checkbox.checked = todo.isComplete
  checkbox.addEventListener('change',()=>{
    todo.isComplete = checkbox.checked
    saveTodos()
  })

  let span = document.createElement('span')
  span.classList.add('label-text')
  span.innerText = todo.title

  let label = document.createElement('label')
  label.classList.add('list-item-label')
  label.append(checkbox)
  label.append(span)

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-btn')
  deleteButton.innerText = 'Delete'
  deleteButton.addEventListener('click', e => {
    e.preventDefault();
    li.remove()
    todos = todos.filter(item => item.id !== todo.id)
    saveTodos();
  })

  li.append(label)
  li.append(deleteButton)

  list.append(li)

}


function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodos() {
  const values = localStorage.getItem('todos')
  if (values === null) return []
  return JSON.parse(values) as Todo[]
}



