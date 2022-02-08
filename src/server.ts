import express from 'express'
import { v4 as uuid } from 'uuid'

const app = express()

app.use(express.json())

interface Users {
    id: string
    name: string
    email: string
}

const users: Users[] = []

app.get('/users', (esquest, response) => {
    return response.json({ users })
})

app.post('/users', (request, response) => {
    const { name, email } = request.body

    const user = { id: uuid(), name, email }

    users.push(user)

    console.log(user)
    
    return response.json(user)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params

    const { name, email } = request.body

    const userIndex = users.findIndex(user => user.id === id)
    if(userIndex < 0) response.status(404).json({ error: 'User not found.'})

    const user = { id, name, email }
    
    users[userIndex] = user

    return response.json(user)
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const userIndex = users.findIndex(user => user.id === id)
    if(userIndex < 0) response.status(404).json({ error: 'User not found.'})

    users.splice(userIndex, 1)

    return response.status(204).send()
})

app.listen('3333', () => {
    console.log('Backend started!')
})