import { Button } from 'antd'

function Welcome(props: {
    logout: () => void,
    name: string
}) {
    return (
        <>
        <p>You're now logged in!</p>
        <p>{props.name}</p>
        <Button
            type="primary"
            htmlType="submit"
            onClick={() => props.logout()}
        >
            Logout
        </Button>
        </>
    )
}

export default Welcome