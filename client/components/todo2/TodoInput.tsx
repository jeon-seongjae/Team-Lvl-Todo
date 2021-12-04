import React, {useState} from 'react'
import 'bulma/css/bulma.min.css'
import {Form as BForm} from 'react-bulma-components'

interface IProps {
  handleAddTodo: Function;
}

const Input: React.FC<IProps> = ({handleAddTodo}) => {
  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo(text)
      setText('')
    }
  }

  return (
    <BForm.Control>
      <BForm.Input
        type="text"
        value={text}
        placeholder="Add a Todo"
        onChange={onChange}
        onKeyPress={onPressEnter}
      />
    </BForm.Control>
  )
}

export default Input
