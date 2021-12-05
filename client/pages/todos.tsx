import type {NextPage} from 'next'
import {
  Section as BSection,
  Container as BContainer,
} from 'react-bulma-components'
import TodosApp from '../components/todo/Todos'

const Todos: NextPage = () => {
  return (
    <BSection>
      <BContainer breakpoint="desktop" max={true}>
        <TodosApp />
      </BContainer>
    </BSection>
  )
}

export default Todos
