import { Interface, type } from 'implement-js'

const LoginModel = Interface('Login')({
    email: type('string'),
    password: type('string'),
}, {
    error: true,
    strict: true,
})

const RegisterModel = Interface('Register')({
    firstName: type('string'),
    lastName: type('string'),
    email: type('string'),
    password: type('string'),
    cPassword: type('string'),
}, {
    error: true,
    strict: true,
})

export {
    LoginModel,
    RegisterModel,
}