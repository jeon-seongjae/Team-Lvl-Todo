import React, {useState} from 'react'
import Input from './Input'
import Todo from './Todo'
import styled from 'styled-components'

let todolist = [
  {id: 1, text: '타입스크립트 공부하기', completed: false},
  {id: 2, text: '리액트 공부하기', completed: false},
  {id: 3, text: 'Next 공부하기', completed: true},
  {id: 4, text: '자바스크립트 공부하기', completed: true},
]

let Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;

  h2 {
    font-size: 70px;
  }
  .todos-wrapper {
    width: 600px;
    padding: 1rem 0;
    border: 1px solid #d9d9d9;
  }
`

const Todos: React.FC = () => {
  const [todos, setTodos] = useState(todolist)

  const onToggleTodoCompleted = () => {
    console.log('todo completed toggle button.')
    let todosCompletedStatus = todos.map(todo => todo.completed)
    console.log(todosCompletedStatus)

    if (todosCompletedStatus.includes(false)) {
      let newTodos = todos.map(function (todo) {
        return {
          id: todo.id,
          text: todo.text,
          completed: true,
        }
      })
      setTodos(newTodos)
    } else {
      let newTodos = todos.map(function (todo) {
        return {
          id: todo.id,
          text: todo.text,
          completed: false,
        }
      })
      setTodos(newTodos)
    }
  }

  const onToggleCompleted = (id: number) => {
    let newTodos = todos.map(function (todo) {
      return todo.id === id ? {...todo, completed: !todo.completed} : todo
    })
    setTodos(newTodos)
  }

  const onDeleteTodo = (id: number) => {
    let newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const onSubmitTodo = (todo: string) => {
    const todoId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1
    let newTodo = {
      id: todoId,
      text: todo,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  return (
    <Container>
      <h2>Todos</h2>
      <div className="todos-wrapper">
        <Input onToggle={onToggleTodoCompleted} onSubmit={onSubmitTodo} />
        {todos.map(todo => (
          <Todo
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={() => onToggleCompleted(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        ))}
      </div>
    </Container>
  )
}

export default Todos
