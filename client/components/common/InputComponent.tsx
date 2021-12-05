import React, {useState} from 'react'
import 'bulma/css/bulma.min.css'
import {Form} from 'react-bulma-components'
import {Color, Size} from '../../types/bulma'

interface IProps {
  color?: Color;
  size?: Size;
  label?: string;
  type?: 'text' | 'password';
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<IProps> = ({label, color, size, ...props}) => {
  return (
    <div style={{width: '100%'}}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control>
        <Form.Input {...props} />
      </Form.Control>
    </div>
  )
}

export default InputComponent
