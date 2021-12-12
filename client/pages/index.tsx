import {NextPage} from 'next'
import {Section, Container} from 'react-bulma-components'
import SigninForm from '../components/signin/SigninForm'

const Home: NextPage = () => {
  return (
    <Section>
      <Container breakpoint="desktop" max={true}>
        <SigninForm />
      </Container>
    </Section>
  )
}

export default Home
