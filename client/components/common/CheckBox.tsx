import React from 'react'
import {BsCircle, BsCheckCircle} from 'react-icons/bs'
import styled from 'styled-components'

// * props 정의
interface IProps {
  isChecked: boolean;
  onClick?: () => void;
}

const Container =
  styled.div <
  {isChecked: boolean} >
  `
  .check-box-wrapper {
    border: 1px soild orangered;
    display: inline-block;
    justify-content: center;
    align-items: center;
    svg {
      width: 32px;
      height: 32px;
      color: ${props => (props.isChecked ? 'green' : 'gray')}
    }
  }
`

const CheckBox: React.FC<IProps> = ({
  isChecked = false,
  onClick = () => console.log('CheckBox Clicked.'),
}) => {
  return (
    <Container isChecked={isChecked}>
      <div className="check-box-wrapper">
        {isChecked ? (
          <BsCheckCircle onClick={onClick} />
        ) : (
          <BsCircle onClick={onClick} />
        )}
      </div>
    </Container>
  )
}

export default CheckBox
