import React from 'react'
import Input from './Input'
import Todo from './Todo'
import styled from 'styled-components'

let todolist = [
  {id: 1, text: '타입스크립트 공부하기', completed: false},
  {id: 2, text: '리액트 공부하기', completed: false},
  {id: 3, text: 'Next 공부하기', completed: true},
  {id: 4, text: '자바스크립트 공부하기', completed: true},
]

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;

  h2 {
    font-size: 70px;
  }
  .todos-wrapper {
    width: 600px;
    padding: 1rem 0;
    border: 1px solid gray;
  }
`

const Todos: React.FC = () => {
  const onToggleTodoCompleted = () => {
    console.log('todo completed toggle button.')
  }
  return (
    <Container>
      <h2>Todos</h2>
      <div className="todos-wrapper">
        <Input />
        {todolist.map(todo => (
          <Todo
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={onToggleTodoCompleted}
          />
        ))}
      </div>
    </Container>
  )
}

export default Todos
