import 'bulma/css/bulma.min.css'
import {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
