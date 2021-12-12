import React, {useState, useCallback, useEffect, useMemo} from 'react'
import {TodoDto} from 'dtos/todo'
import {TabType} from 'enums/todo'
import {TodoApi} from 'api/todo'
import {Todo, TodoInput, TodoTabs} from '.'
import {Panel as BPanel} from 'react-bulma-components'

interface IProps {
  nickname: string
  token: string
}

const Todos: React.FC<IProps> = ({nickname, token}) => {
  const [todos, setTodos] = useState<TodoDto[]>([])
  const [tabType, setTabType] = useState(TabType.ALL)

  useEffect(() => {
    TodoApi.setToken(token)
  }, [token])

  useEffect(() => {
    const fetchTodos = async () => {
      const todoDtos = await TodoApi.getTodos()
      setTodos(todoDtos)
    }

    fetchTodos()
  }, [])

  const handleAddTodo = useCallback(
    (text: string) => {
      if (text.trim().length <= 0) {
        return
      }

      const todo: TodoDto = {
        text,
        done: false,
      }
      setTodos([...todos, todo])
      TodoApi.addTodo(text)
    },
    [todos],
  )

  const handleRemoveTodo = useCallback(
    (todo: TodoDto) => {
      const filteredTodos = todos.filter(item => item !== todo)
      setTodos(filteredTodos)
      TodoApi.removeTodo(todo)
    },
    [todos],
  )

  const handleToggleTodo = (todo: TodoDto) => {
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
      {filteredTodos.map((todo, index) => (
        <BPanel.Block key={index}>
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
