import React, {useState} from 'react'
import styled from 'styled-components'
import InputComponent from '../common/InputComponent'
import {MdKeyboardArrowDown} from 'react-icons/md'
import {Form} from 'react-bulma-components'
import {writeFileSync} from 'fs'

const Container = styled.div`
  width: 100%;
  height: 55px;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: gray;
  }
`

interface IProps {
  onToggle: () => void;
  onSubmit: (todo: string) => void;
}

const Input: React.FC<IProps> = ({onToggle, onSubmit}) => {
  const [text, setText] = useState('')

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value)

  const onSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text) return
    onSubmit(text)
    setText('')
  }

  return (
    <Container>
      <MdKeyboardArrowDown size="2rem" onClick={onToggle} />
      <form style={{width: '100%'}} onSubmit={onSubmitTodo}>
        <Form.Field>
          <InputComponent
            color="primary"
            type="text"
            value={text}
            onChange={onChangeText}
          />
        </Form.Field>
      </form>
    </Container>
  )
}

export default Input
