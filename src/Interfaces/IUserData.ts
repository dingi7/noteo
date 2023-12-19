export interface RegisterUserData {
    firstName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface UserSession {
    _id: string;
    username: string;
    email: string;
    accessToken: string;
}
