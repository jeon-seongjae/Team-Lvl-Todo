import React from 'react'
import 'bulma/css/bulma.min.css'
import {Button as BButton} from 'react-bulma-components'
import {Form as BForm} from 'react-bulma-components'
import {ITodo} from '../../types/todo2'

interface IProps {
  todo: ITodo;
  handleRemoveTodo: Function;
  handleToggleTodo: Function;
}

const Todo: React.FC<IProps> = ({todo, handleRemoveTodo, handleToggleTodo}) => {
  const handleToggleCheckbox = () => {
    handleToggleTodo(todo)
  }

  const handleClickRemoveButton = () => {
    handleRemoveTodo(todo)
  }

  return (
    <div>
      <BForm.Checkbox
        defaultChecked={todo.done}
        onChange={handleToggleCheckbox}
      >
        {todo.text}
        <BButton onClick={handleClickRemoveButton} remove />
      </BForm.Checkbox>
    </div>
  )
}

export default Todo
