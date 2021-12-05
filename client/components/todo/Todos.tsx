import React, {useState, useRef, useCallback, useMemo} from 'react'
import {ITodo} from 'types/todo'
import {TabType} from 'enums/todo'
import {Todo, TodoInput, TodoTabs} from '.'
import {Panel as BPanel} from 'react-bulma-components'

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [tabType, setTabType] = useState(TabType.ALL)
  const nextId = useRef(1)

  const handleAddTodo = useCallback(
    (text: string) => {
      if (text.trim().length <= 0) {
        return
      }

      const todo: ITodo = {
        id: nextId.current,
        text,
        done: false,
      }
      setTodos([...todos, todo])
      nextId.current++
    },
    [todos],
  )

  const handleRemoveTodo = useCallback(
    (todo: ITodo) => {
      const filteredTodos = todos.filter(item => item.id !== todo.id)
      setTodos(filteredTodos)
    },
    [todos],
  )

  const handleToggleTodo = (todo: ITodo) => {
    const updatedTodos = todos.map(item => {
      if (item === todo) {
        return {...item, done: !item.done}
      }

      return item
    })

    setTodos(updatedTodos)
  }

  const handleClickTab = (type: TabType) => {
    setTabType(type)
  }

  const filteredTodos = useMemo(() => {
    switch (tabType) {
      case TabType.TODO:
        return todos.filter(todo => todo.done === false)
      case TabType.DONE:
        return todos.filter(todo => todo.done === true)
    }

    return todos
  }, [todos, tabType])

  return (
    <BPanel color="primary">
      <BPanel.Header>Todos</BPanel.Header>
      <BPanel.Block>
        <TodoInput handleAddTodo={handleAddTodo} />
      </BPanel.Block>
      <TodoTabs type={tabType} handleClickTab={handleClickTab} />
      {filteredTodos.map(todo => (
        <BPanel.Block key={todo.id}>
          <Todo
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleToggleTodo={handleToggleTodo}
          />
        </BPanel.Block>
      ))}
    </BPanel>
  )
}

export default Todos
