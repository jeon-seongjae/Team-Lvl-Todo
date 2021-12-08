import {NextPage} from 'next'
import {Section, Container} from 'react-bulma-components'
import SignupForm from '../components/signup/SignupForm'

const signup: NextPage = () => {
  return (
    <Section>
      <Container breakpoint="desktop" max={true}>
        <SignupForm />
      </Container>
    </Section>
  )
}

export default signup
