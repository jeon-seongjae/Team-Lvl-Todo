import type {NextPage} from 'next'
import 'bulma/css/bulma.min.css'
import {Container as BContainer} from 'react-bulma-components'
import TodosApp from '../components/todo2/Todos'

const Todos: NextPage = () => {
  return (
    <BContainer breakpoint="desktop" max={true}>
      <TodosApp />
    </BContainer>
  )
}

export default Todos
