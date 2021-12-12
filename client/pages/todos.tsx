import {NextPage, GetServerSideProps} from 'next'
import {
  Section as BSection,
  Container as BContainer,
} from 'react-bulma-components'
import TodosApp from '../components/todo/Todos'
import {getUserAPI} from 'api/register/register'

const Todos: NextPage = ({data}) => {
  console.log(data)

  return (
    <BSection>
      <BContainer breakpoint="desktop" max={true}>
        {/* <TodosApp /> */}
        {data.success ? (
          <TodosApp
            nickname={data.userData.nickname}
            token={data.userData.token}
          />
        ) : (
          <h2>접근 권한이 없는 페이지입니다.</h2>
        )}
      </BContainer>
    </BSection>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  console.log('token : ', context.req.cookies)
  const token = context.req.cookies.access_token
  let userData
  if (!token) {
    userData = null
  } else {
    // const {nickname} = await getUserAPI()
    // userData = {nickname}
    userData = {nickname: 'Wilted Carrot', token: token}
  }
  // const userData = {email: 'tester@gmail.comm', nickname: 'Carrot'}

  return {
    props: {
      data: {success: token ? true : false, userData},
    },
  }
}

export default Todos
