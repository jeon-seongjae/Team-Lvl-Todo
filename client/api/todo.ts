import axios from 'axios'
import {plainToInstance} from 'class-transformer'
import {TodoDto} from 'dtos/todo'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
})

interface TodoResponseDto {
  id: number
  title: string
  content: string
  status: number
}

export const TodoApi = {
  setToken: (token: string) => {
    instance.defaults.headers.common['Authorization'] = `bearer ${token}`
  },
  getTodos: async (): Promise<TodoDto[]> => {
    try {
      const {data} = await instance.get<Array<TodoResponseDto>>('/todo')
      const todos = plainToInstance(TodoDto, data)
      return todos
    } catch (error) {
      console.error(error)
    }

    return []
  },
  addTodo: async (text: string): Promise<TodoResponseDto[]> => {
    try {
      const {data} = await instance.post('/todo', {
        content: text,
        status: 0,
        title: 'test',
      })
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
  removeTodo: async (todo: TodoDto): Promise<TodoResponseDto[]> => {
    try {
      const {data} = await instance.delete('/todo/delete', {
        data: {id: todo.id},
      })
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
  updateTodo: async (todo: TodoDto): Promise<TodoResponseDto[]> => {
    try {
      const {data} = await instance.patch('/todo/update', {
        todo,
      })
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
}
