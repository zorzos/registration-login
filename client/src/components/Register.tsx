import { Button, Form, Input } from 'antd'

function Register(props: {
    name: string,
    setName: (fullName: string) => void,
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void,
    confirmPassword: string,
    setConfirmPassword: (confimPassword: string) => void,
    register: () => void,
    toggleRegisterScreen: () => void
}) {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        register,
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
                    Register Form:
                </h3>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Form.Item>

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
                    name="Password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8 },
                        { 
                            pattern: new RegExp('^(?=.*[0-9])(?=.*[a-z])([a-z0-9_-]+)$'), 
                            message: 'Field must have at least one character and one number.'
                        }
                    ]}
                >
                    <Input.Password
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules= {[
                        { required: true, message: 'Please confirm your password!' },
                        { min: 8 },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('Password') === value) {
                                return Promise.resolve();
                            }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        })
                    ]}
                >
                    <Input.Password
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => register()}
                        disabled
                    >
                            Register
                    </Button>
                    <br /><br />
                    <p>Go back to the <a href="#" onClick={() => toggleRegisterScreen()}>log in screen</a>!</p>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register
function getFieldDecorator(arg0: string, arg1: { rules: { required: boolean; type: string; message: string }[] }) {
    throw new Error('Function not implemented.')
}

