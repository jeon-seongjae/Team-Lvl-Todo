import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
})

interface TodoDto {
  title: string
  content: string
  status: number
}

export const TodoApi = {
  getTodos: async (): Promise<TodoDto[]> => {
    try {
      const {data} = await instance.get('/todo')
      console.log(data)
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
  addTodo: async (): Promise<TodoDto[]> => {
    try {
      const {data} = await instance.post('/todo')
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
  removeTodo: async (): Promise<TodoDto[]> => {
    try {
      const {data} = await instance.delete('/todo/delete')
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
  updateTodo: async (): Promise<TodoDto[]> => {
    try {
      const {data} = await instance.patch('/todo/update')
      return data
    } catch (error) {
      console.error(error)
    }

    return []
  },
}
