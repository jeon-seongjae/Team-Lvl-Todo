import React from 'react'
import CheckBox from '../common/CheckBox'
import styled from 'styled-components'
import {CgClose} from 'react-icons/cg'

const Container =
  styled.div <
  {completed: boolean} >
  `
  width: 100%;
  height: 70px;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  &:hover {
    .todo-delete-button-wrapper {
      display: flex;
    }
  }

  .todo-text {
    width: 100%;
    margin-left: 1rem; 
    text-decoration: ${props => (props.completed ? 'line-through' : 'none')} 
    
  }
  .todo-delete-button-wrapper {
    display: none;
    width: 50px;
    align-items: center;
    justify-content: center;
    svg {
      width: 32px;
      height: 32px;
      color: #d9d9d9;
    }
  }
`

interface IProps {
  text: string;
  completed: boolean;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const Todo: React.FC<IProps> = ({
  text,
  completed = false,
  onToggle,
  onDelete,
}) => {
  return (
    <Container completed={completed}>
      <CheckBox isChecked={completed} onClick={onToggle} />
      <div className="todo-text">{text}</div>
      <div className="todo-delete-button-wrapper">
        <CgClose onClick={onDelete} />
      </div>
    </Container>
  )
}

export default React.memo(Todo)
