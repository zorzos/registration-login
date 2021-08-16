export const REGISTER_USER = `
    mutation register($email: String!, $name: String!, $password: String!) {
        register(email: $email, name: $name, password: $password) {
            email,
            name
        }
    }
`