export const LOG_IN_USER = `
    query loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id,
            name,
            email,
            token
        }
    }
`

export const LOG_OUT_USER = `
    query logoutUser($email: String!, $token: String!) {
        logout(email: $email, token: $token)
    }
`