import React, {useState, useRef, useCallback} from 'react'
import {ITodo} from '../../types/todo2'
import Todo from './Todo'
import Input from './TodoInput'
import 'bulma/css/bulma.min.css'
import {Panel as BPanel} from 'react-bulma-components'

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const nextId = useRef(1)

  const handleAddTodo = useCallback(
    (text: string) => {
      if (text.trim().length <= 0) {
        return
      }

      const todo: ITodo = {
        id: nextId.current,
        text,
        done: false,
      }
      setTodos([...todos, todo])
      nextId.current++
    },
    [todos],
  )

  const handleRemoveTodo = useCallback(
    (todo: ITodo) => {
      const filteredTodos = todos.filter(item => item.id !== todo.id)
      setTodos(filteredTodos)
    },
    [todos],
  )

  const handleToggleTodo = (todo: ITodo) => {
    const updatedTodos = todos.map(item => {
      if (item === todo) {
        return {...item, done: !item.done}
      }

      return item
    })

    setTodos(updatedTodos)
  }

  return (
    <BPanel color="primary">
      <BPanel.Header>Todos</BPanel.Header>
      <BPanel.Block>
        <Input handleAddTodo={handleAddTodo} />
      </BPanel.Block>
      {todos.map(todo => (
        <BPanel.Block key={todo.id}>
          <Todo
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleToggleTodo={handleToggleTodo}
          />
        </BPanel.Block>
      ))}
    </BPanel>
  )
}

export default Todos
