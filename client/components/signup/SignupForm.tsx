import React, {useState, useCallback, useMemo, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {Panel, Button} from 'react-bulma-components'
import InputComponent from './InputComponent'
import {signupAPI} from '../../api/register/register'

const PASSWORD_MIN_LENGTH = 8
const SYMBOL = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g
const NUMBER = /[0-9]/g

const registerCheckStyle = {
  margin: '0 auto',
}
const checkMessageStyle = {
  margin: '0 auto',
}

const SignupForm: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateMode, setValidateMode] = useState(false)
  const [nickname, setNickname] = useState('')

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value)
  }

  // * 비밀번호가 최소 8자리 이상인지 체크
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  )

  // * 비밀번호와 비밀번호 확인이 일치하는지 체크
  const passwordCheck = useMemo(
    () => !!confirmPassword && password === confirmPassword,
    [password, confirmPassword],
  )

  // * 비밀번호가 숫자나 특수기호를 포함하는지 체크
  const isPasswordHasNumberOrSymbol = useMemo(
    () => !(SYMBOL.test(password) || NUMBER.test(password)),
    [password],
  )

  // * 입력받은 id, password, confirmPassword값이 유효한 값인지 체크
  const validateSignUpForm = () => {
    if (!email || !password || !confirmPassword) {
      return false
    }

    if (
      !isPasswordOverMinLength ||
      !passwordCheck ||
      isPasswordHasNumberOrSymbol
    ) {
      return false
    }

    return true
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidateMode(true)

    if (validateSignUpForm()) {
      console.log('Sign Up API Request')
      const signupBody = {
        email,
        nickname,
        password,
      }
      try {
        const {data} = await signupAPI(signupBody)

        if (data === 'OK') {
          alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.')
          router.push('/')
        } else {
          alert(data.data.message)
          // ! response.errorMessage 출력
          // * setErrorMessage(response.errorMessage)
          // * {errorMessage && (<p>{errorMessage}</p>)}
          return
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('회원가입중 에러가 발생했습니다.')
      return
    }
  }

  useEffect(() => {
    return () => setValidateMode(false)
  }, [])

  return (
    <Panel color="info">
      <Panel.Header>Sign Up</Panel.Header>
      <Panel.Block>
        <form style={{width: '100%'}} onSubmit={onSubmit}>
          <InputComponent
            label="Email"
            type="email"
            placeholder="사용할 Email 주소를 입력해 주세요."
            value={email}
            onChange={onChangeEmail}
            errorMessage="올바른 Email 주소를 입력해 주세요."
            isValid={!!email}
            validateMode={validateMode}
          />
          <InputComponent
            label="Nickname"
            type="text"
            placeholder="사용할 닉네임을 입력해주세요."
            value={nickname}
            onChange={onChangeNickname}
            errorMessage="닉네임을 입력해 주세요."
            isValid={!!nickname}
            validateMode={validateMode}
          />
          <InputComponent
            label="Password"
            type="password"
            placeholder="8자리 이상이고 숫자나 기호를 포함한 비밀번호를 입력해 주세요."
            value={password}
            onChange={onChangePassword}
            errorMessage="8자리 이상이고 숫자나 기호를 포함한 비밀번호를 입력해 주세요."
            isValid={
              !!password &&
              isPasswordOverMinLength &&
              !isPasswordHasNumberOrSymbol
            }
            validateMode={validateMode}
          />
          <InputComponent
            label="Password Confirm"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요."
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            errorMessage="비밀번호가 일치하지 않습니다."
            isValid={!!confirmPassword && passwordCheck}
            validateMode={validateMode}
          />
          <Button.Group align="center">
            <Button color="primary">회원등록하기</Button>
          </Button.Group>
        </form>
      </Panel.Block>
      <Panel.Block>
        <div className="register-check-wrapper" style={registerCheckStyle}>
          <p style={checkMessageStyle}>
            <Link href="/">
              <a>로그인하기</a>
            </Link>
          </p>
        </div>
      </Panel.Block>
    </Panel>
  )
}

export default SignupForm
