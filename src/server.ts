import express from 'express'

const app = express()

interface Users {
    id: string
    name: string
    email: string
}

const users: Users[] = []

app.listen('3333', () => {
    console.log('Backend started!')
})