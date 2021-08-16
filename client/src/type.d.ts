export interface UserDetails {
    name?: string
    email: string,
    password: string
}

export interface UserLogout {
    email: string,
    token: string
}

export interface NotificationDetails {
    message: string,
    description: string
}