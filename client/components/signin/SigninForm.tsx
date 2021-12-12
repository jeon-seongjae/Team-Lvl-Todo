import React, {useState, useCallback, useMemo, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {Panel, Button} from 'react-bulma-components'
import InputComponent from '../signup/InputComponent'
import {signinAPI} from '../../api/register/register'

const registerCheckStyle = {
  margin: '0 auto',
}
const checkMessageStyle = {
  margin: '0 auto',
}

const SigninForm: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validateMode, setValidateMode] = useState(false)

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  // * 입력받은 id, password, confirmPassword값이 유효한 값인지 체크
  const validateSignInForm = () => {
    if (!email || !password) {
      return false
    }

    return true
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidateMode(true)

    if (validateSignInForm()) {
      console.log('Sign In API Request')
      const signinBody = {
        email,
        password,
      }

      const {data} = await signinAPI(signinBody)

      if (data === 'OK') {
        console.log('login 성공')
        router.push('/todos')
      } else {
        alert(data.message)
        // ! response.errorMessage 출력
        // * setErrorMessage(response.errorMessage)
        // * {errorMessage && (<p>{errorMessage}</p>)}
        return
      }
    } else {
      console.log('로그인중 에러가 발생했습니다.')
      return
    }
  }

  useEffect(() => {
    return () => setValidateMode(false)
  }, [])

  return (
    <Panel color="info">
      <Panel.Header>Sign In</Panel.Header>
      <Panel.Block>
        <form style={{width: '100%'}} onSubmit={onSubmit}>
          <InputComponent
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChangeEmail}
            errorMessage="Email 주소를 입력해 주세요."
            isValid={!!email}
            validateMode={validateMode}
          />
          <InputComponent
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
            errorMessage="비밀번호를 입력해주세요."
            isValid={!!password}
            validateMode={validateMode}
          />
          <Button.Group align="center">
            <Button color="primary">로그인하기</Button>
          </Button.Group>
        </form>
      </Panel.Block>
      <Panel.Block>
        <div className="register-check-wrapper" style={registerCheckStyle}>
          <p style={checkMessageStyle}>
            <Link href="/signup">
              <a>회원가입하기</a>
            </Link>
          </p>
        </div>
      </Panel.Block>
    </Panel>
  )
}

export default SigninForm
