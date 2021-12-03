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

const Input: React.FC = () => {
  const [text, setText] = useState('')

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value)

  const onSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(text)
    if (!text) return

    // ? backend request api

    setText('')
  }

  const onClickAllCompleteToggle = () => {
    console.log('onClickAllCompleteToggle.')
    // ? backend request api
    // * 모든 todo값의 complete값을 toggle
    // * 조건 1 : todo중 하나라도 complete값이 false인 경우, 모두 true / else false
  }
  return (
    <Container>
      <MdKeyboardArrowDown size="2rem" onClick={onClickAllCompleteToggle} />
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
