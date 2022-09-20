import { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default App
