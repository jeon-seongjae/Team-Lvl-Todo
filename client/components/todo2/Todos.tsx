import React, {useState, useCallback} from 'react'
import {ITodo} from '../../types/todo2'
import Todo from './Todo'
import Input from './TodoInput'

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  
  const handleAddTodo = useCallback(
    (text: string) => {
      if (text.trim().length <= 0) {
        return;
      }

      const todo: ITodo = {
        id: todos.length + 1,
        text,
        done: false,
      }
      setTodos([...todos, todo])
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

  const handleToggleTodo = 
    (todo: ITodo) => {
      const updatedTodos = todos.map(item => {
        if (item === todo) {
          return {...item, done: !item.done}
        }

        return item;
      })
      
      setTodos(updatedTodos)
    }

  return (
    <div>
      <Input handleAddTodo={handleAddTodo} />
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} handleRemoveTodo={handleRemoveTodo} handleToggleTodo={handleToggleTodo} />
      ))}
    </div>
  )
}

export default Todos
