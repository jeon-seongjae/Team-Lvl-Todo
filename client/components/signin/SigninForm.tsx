import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Panel, Button} from 'react-bulma-components'
import InputComponent from '../signup/InputComponent'

const SigninForm: React.FC = () => {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [validateMode, setValidateMode] = useState(false)

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  // * 입력받은 id, password, confirmPassword값이 유효한 값인지 체크
  const validateSignInForm = () => {
    if (!id || !password) {
      return false
    }

    return true
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidateMode(true)

    if (validateSignInForm()) {
      console.log('Sign In API Request')
      router.push('/todos')
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
            label="ID"
            type="text"
            placeholder="ID"
            value={id}
            onChange={onChangeId}
            errorMessage="ID를 입력해 주세요."
            isValid={!!id}
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
    </Panel>
  )
}

export default SigninForm
