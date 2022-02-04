import { Interface, type } from 'implement-js'

const LoginModel = Interface('Login')({
    email: type('string'),
    password: type('string'),
}, {
    error: true,
    strict: true,
})

export {
    LoginModel,
}