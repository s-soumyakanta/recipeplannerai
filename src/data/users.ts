export type UsersType = {email:String,password:String}[]
const users:UsersType = [
    {
        email:"a@a.com",
        password:"password"
    },
    {
        email:"b@a.com",
        password:"password"
    },
    {
        email:"c@a.com",
        password:"password"
    },
]

export const getUserByEmail = (email: string) => {
    const findEmail = users.find(user => user.email === email)
    return findEmail
}