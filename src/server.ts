import express from 'express'
import { v4 as uuid } from 'uuid'

const app = express()

interface Users {
    id: string
    name: string
    email: string
}

const users: Users[] = []

app.get('/users', (esquest, response) => {
    return response.json({ users })
})

app.post('/users/:id', (request, response) => {
    const { name, email } = request.body

    const user = { id: uuid(), name, email }

    users.push(user)
    
    return response.json(user)
})

app.listen('3333', () => {
    console.log('Backend started!')
})