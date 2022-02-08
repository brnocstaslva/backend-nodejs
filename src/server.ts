import express from 'express'

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

app.listen('3333', () => {
    console.log('Backend started!')
})