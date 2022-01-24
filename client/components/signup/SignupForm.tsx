import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Panel, Button} from 'react-bulma-components'
import InputComponent from './InputComponent'

const PASSWORD_MIN_LENGTH = 8
const SYMBOL = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g
const NUMBER = /[0-9]/g

const SignupForm: React.FC = () => {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateMode, setValidateMode] = useState(false)

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
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
    if (!id || !password || !confirmPassword) {
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidateMode(true)

    if (validateSignUpForm()) {
      console.log('Sign Up API Request')
      router.push('/signin')
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
            label="ID"
            type="text"
            placeholder="사용할 ID를 입력해 주세요."
            value={id}
            onChange={onChangeId}
            errorMessage="ID를 입력해 주세요."
            isValid={!!id}
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
    </Panel>
  )
}

export default SignupForm
