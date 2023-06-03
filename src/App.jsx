import React, { useEffect, useState } from "react"
import { useRoutes, useNavigate } from "react-router-dom"
import { routes } from "./routes"
import { Header } from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import AuthContext from "./context/AuthContext"
import { get, post } from "./utility"
import { toast } from "react-hot-toast"

const hideHeaderPathes = [
  '/register',
  '/admin',
  '/admin/home',
  '/admin/users',
  '/admin/orders',
]

const hideFooterPathes = [
  '/register',
  '/dashboard',
  '/dashboard/orders',
  '/dashboard/tickets',
  '/admin',
  '/admin/home',
  '/admin/users',
  '/admin/orders',
]

function App() {
  const [userToken, setUserToken] = useState(null)
  const [isLogin, setIslogin] = useState(localStorage.getItem("e-service-token") ? true : false)
  const [userInfo, setUserInfo] = useState({})

  const router = useRoutes(routes)
  const redirect = useNavigate()

  const login = (token, info) => {
    setUserToken(token)
    setIslogin(true)
    setUserInfo(info)
    localStorage.setItem('e-service-token', token)
  }

  const logOut = () => {
    post('/logout', { token: userToken })
      .then(response => {
        if (response.data.ok) {
          setUserToken(null)
          setIslogin(false)
          setUserInfo({})
          localStorage.removeItem('e-service-token')
          redirect('/')
        } else toast.error(response.data.err)
      })
  }

  useEffect(() => {
    const localStorageData = localStorage.getItem('e-service-token')
    localStorageData &&
      get(`/informations/get?token=${localStorageData}`)
        .then(response => {
          if (response.data.ok) {
            setIslogin(true)
            setUserInfo(response.data.user)
            setUserToken(localStorageData)
          }
          else {
            setUserToken(null)
            setIslogin(false)
            setUserInfo({})
            localStorage.removeItem('e-service-token')
          }
        })
        .catch(() => {
          setUserToken(null)
          setIslogin(false)
          setUserInfo({})
          localStorage.removeItem('e-service-token')
        })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLogin,
        userInfo,
        login,
        logOut
      }}
    >
      {
        !hideHeaderPathes.includes(location.pathname) && <Header />
      }

      {router}

      {
        !hideFooterPathes.includes(location.pathname) && <Footer />
      }
    </AuthContext.Provider>
  )
}

export default App