import { Button, Form, Input } from 'antd'

function Login(props: {
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void,
    login: () => void,
    toggleRegisterScreen: () => void
}) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        login,
        toggleRegisterScreen
    } = props
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <h3 className="label">
                    Login Form:
                </h3>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your e-mail address!' },
                        { type: 'email', message: 'Please enter a valid e-mail address.' }
                    ]}
                >
                    <Input
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' }
                    ]}
                >
                    <Input.Password
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={() => login()}>Log in</Button>
                    <br /><br />
                    <p>Or try <a href="#" onClick={() => toggleRegisterScreen()}>registering</a>!</p>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login
