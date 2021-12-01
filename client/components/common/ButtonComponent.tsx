import React from 'react'
import 'bulma/css/bulma.min.css'
import {Button as BulmaButton} from 'react-bulma-components'
import {Color, Size} from '../../types/bulma'

interface IProps {
  color?: Color;
  children?: React.ReactNode;
  submit?: boolean;
  size?: Size;
  outlined?: true | false;
  onClick?: () => void;
}

const ButtonComponent: React.FC<IProps> = ({
  color = 'text',
  children,
  size = '',
  outlined = false,
  submit = false,
  ...props
}) => {
  return (
    <BulmaButton
      color={color}
      size={size}
      outlined={outlined}
      submit={submit}
      {...props}
    >
      {children}
    </BulmaButton>
  )
}

export default ButtonComponent
