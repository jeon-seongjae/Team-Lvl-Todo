import React from 'react'
import {Form} from 'react-bulma-components'

const errorMessageStyle = {
  fontSize: '14px',
  color: 'orangered',
  fontWeight: '600',
  marginLeft: '12px',
}

interface IProps {
  label: 'ID' | 'Password' | 'Password Confirm' | 'Email' | 'Nickname'
  type: 'text' | 'password' | 'email'
  placeholder?: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  isValid?: boolean | (() => boolean)
  validateMode: boolean
}

const InputComponent: React.FC<IProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  isValid,
  validateMode,
}) => {
  return (
    <Form.Field>
      <Form.Label>{label}</Form.Label>
      <Form.Control>
        <Form.Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {!isValid && validateMode && (
          <div className="error-message-wrapper">
            <span style={errorMessageStyle}>{errorMessage}</span>
          </div>
        )}
      </Form.Control>
    </Form.Field>
  )
}

export default InputComponent
