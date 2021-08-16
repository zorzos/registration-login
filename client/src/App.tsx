import React from 'react'
import { Row, Col, notification, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import Login from './components/Login'
import Register from './components/Register'
import * as api from './api/api'
import { NotificationDetails } from './type'
import Welcome from './components/Welcome'
import { 
  REGISTER_USER
} from './graphql/mutations'

import {
  LOG_IN_USER,
  LOG_OUT_USER
} from './graphql/queries'

function App() {
  const [loadingIndicator, setLoadingIndicator] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [registerScreen, setRegisterScreen] = React.useState(false)
  const [user, setUser] = React.useState({
    name: "",
    token: ""
  })

  const registerUserTest = () => {
    const operationName = 'register'
    setLoadingIndicator(true)
    api.register(
      {name, email, password},
      REGISTER_USER
    ).then(() => {
      const details: NotificationDetails = {
        message: 'Successfully registered!',
        description: 'You have successfully registered, use your credentials to log in.'
      }
      openNotification('success', details)
      setLoadingIndicator(false)
      setRegisterScreen(!registerScreen)
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }).catch(() => {
      const details: NotificationDetails = {
        message: 'Error!',
        description: 'Please check your details and try again!'
      }
      openNotification('error', details)
      setLoadingIndicator(false)
    })
  }

  const login = () => {
    setLoadingIndicator(true)
    api.login(
      {email, password},
      LOG_IN_USER
    )
    .then(response => {
      const fetchedUser = response.data.data.login
      setUser(fetchedUser)
      const details: NotificationDetails = {
        message: `Welcome ${fetchedUser.name}!`,
        description: 'You have successfully logged in!'
      }
      openNotification('success', details)
      setLoadingIndicator(false)
      setLoggedIn(true)
    }).catch(() => {
      const details: NotificationDetails = {
        message: 'Error!',
        description: 'Please check your credentials and try again!'
      }
      openNotification('error', details)
      setLoadingIndicator(false)
    })
  }

  const logout = () => {
    api.logout(
      {email, token: user.token},
      LOG_OUT_USER
    ).then(() => {
      const details: NotificationDetails = {
        message: 'Success!',
        description: 'You have successfully logged out!'
      }
      openNotification('success', details)
      setLoadingIndicator(false)
      setEmail("")
      setPassword("")
      setLoggedIn(false)
    }).catch(() => {
      const details: NotificationDetails = {
        message: 'Error!',
        description: 'Something went wrong, please try again!'
      }
      openNotification('error', details)
      setLoadingIndicator(false)
    })
  }

  const openNotification = (type: string, details: NotificationDetails) => {
    const args = {message: details.message, description: details.description}
    switch (type) {
      case 'success':
        notification.success(args)
        break
      case 'error':
        notification.error(args)
        break
      default:
        break
    }
  }

  return (
    <div className="App">
      <div className="main-layout">
            <Row>
              <Col flex="400px">
                {loggedIn &&
                  <Welcome
                    name={user.name}
                    logout={logout}
                  />
                }

                {registerScreen && !loadingIndicator &&
                  <Register
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    register={registerUserTest}
                    toggleRegisterScreen={() => setRegisterScreen(!registerScreen)}
                  />
                }

                {loadingIndicator &&
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                  />
                }

                {(!registerScreen && !loggedIn && !loadingIndicator) &&
                  <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    login={login}
                    toggleRegisterScreen={() => setRegisterScreen(!registerScreen)}
                  />
                }
              </Col>
            </Row>
        </div>
    </div>
  );
}

export default App;
