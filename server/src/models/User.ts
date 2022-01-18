export interface User {
    uuid: string,
    email: string,
    password?: string,
    firstname?: string,
    lastname?: string,
    auth_type: string,
    verified: boolean,
    created_date: Date,
    updated_date: Date,
}
