import React from 'react'
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css'
import './App.css'

function App() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loggedIn, setLoggedIn] = React.useState(false)

  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setEmail("")
    setPassword("")
    setLoggedIn(false)
  }

  return (
    <div className="App">
      <div className="main-layout">
            <Row>
              <Col flex="350px">
                {!loggedIn ? <>
                  <p>Please use your credentials to log in:</p>
                  <label>Email:</label>
                  <input
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                    size={50}
                  />
                  <br /><br />
                  <label>Password:</label>
                  <input
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    size={50}
                    type="password"
                  />
                  <br /><br />
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => login()}
                  >
                    Submit
                  </Button>
                </> :
                <>
                  <p>You're now logged in!</p>
                  <p>ENTER NAME HERE</p>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </>}
              </Col>
            </Row>
        </div>
    </div>
  );
}

export default App;
