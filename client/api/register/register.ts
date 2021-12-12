import axios, {AxiosRequestConfig} from 'axios'
// import Cookie from 'js-cookie

const Axios = axios.create({
  baseURL: 'http://localhost:4000',
})

interface LoginDto {
  email: string
  password: string
}

interface CreateUserDto extends LoginDto {
  nickname: string
}

export const signupAPI = (userData: CreateUserDto) =>
  Axios.post('/user', userData)
export const signinAPI = (userData: LoginDto) =>
  Axios.post('/user/login', userData)
export const getUserAPI = () => Axios.get('/user')
export const deleteAccountAPI = () => Axios.delete('/user/delete')
export const refreshTokenAPI = () => Axios.get('/user/refreshToken')

const refreshToken = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const accessToken = Cookie.get('access_token')
  // token expires 만료시 refreshTokenApi();
  return config
}
Axios.interceptors.request.use(refreshToken)
