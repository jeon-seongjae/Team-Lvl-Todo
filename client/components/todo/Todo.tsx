import React from 'react'
import CheckBox from '../common/CheckBox'
import styled from 'styled-components'
import {CgClose} from 'react-icons/cg'

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  &:hover {
    .todo-delete-button-wrapper {
      display: flex;
    }
  }

  .todo-text {
    width: 100%;
    margin-left: 1rem;
  }
  .todo-delete-button-wrapper {
    display: none;
    width: 50px;
    align-items: center;
    justify-content: center;
    svg {
      width: 32px;
      height: 32px;
      color: gray;
    }
  }
`

interface IProps {
  text: string;
  completed: boolean;
  onToggle?: () => void;
}

const Todo: React.FC<IProps> = ({text, completed = false, onToggle}) => {
  return (
    <Container>
      <CheckBox isChecked={completed} onClick={onToggle} />
      <div className="todo-text">{text}</div>
      <div className="todo-delete-button-wrapper">
        <CgClose onClick={() => console.log('todo delete button.')} />
      </div>
    </Container>
  )
}

export default Todo
