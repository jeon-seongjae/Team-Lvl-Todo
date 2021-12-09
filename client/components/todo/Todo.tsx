import React from 'react'
import {Button as BButton} from 'react-bulma-components'
import {Form as BForm} from 'react-bulma-components'
import {ITodo} from 'types/todo'

interface IProps {
  todo: ITodo
  handleRemoveTodo: (todo: ITodo) => void
  handleToggleTodo: (todo: ITodo) => void
}

const Todo: React.FC<IProps> = ({todo, handleRemoveTodo, handleToggleTodo}) => {
  const lineThroughStyle = {
    textDecoration: 'line-through',
  }

  return (
    <div>
      <BForm.Checkbox
        defaultChecked={todo.done}
        onChange={() => handleToggleTodo(todo)}
        style={todo.done ? lineThroughStyle : {}}
      >
        {todo.text}
        <BButton
          className="ml-2"
          onClick={() => handleRemoveTodo(todo)}
          remove
        />
      </BForm.Checkbox>
    </div>
  )
}

export default Todo
