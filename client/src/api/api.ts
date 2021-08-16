import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { 
    UserDetails,
    UserLogout 
} from '../type'

const baseURL = 'http://localhost:9000/graphql'

export const register = (variables: UserDetails, query: String) => 
axios.post(
    baseURL,
    {
        operationName: 'register',
        variables,
        query
    }
)

export const login = (variables: UserDetails, query: String) => 
axios.post(
    baseURL,
    {
        operationName: 'loginUser',
        variables,
        query
    }
)

export const logout = (variables: UserLogout, query: String) => {
    return axios.post(baseURL,
        {
            operationName: 'logoutUser',
            variables,
            query
        }
    )
}