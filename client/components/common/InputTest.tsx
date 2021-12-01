import React, {useState} from 'react'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'
import {Form} from 'react-bulma-components'

const InputTest: React.FC = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit event')
    console.log('id : ', id, 'password : ', password)
  }
  return (
    <div style={{padding: '1rem'}}>
      <form onSubmit={onSubmit}>
        <Form.Field>
          <InputComponent
            color="primary"
            label="ID"
            type="text"
            value={id}
            onChange={onChangeId}
          />
          <InputComponent
            color="primary"
            label="Password"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <ButtonComponent submit={true} color="info">
            Submit
          </ButtonComponent>
        </Form.Field>
      </form>
    </div>
  )
}

export default InputTest
