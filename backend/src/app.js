import express from 'express'
import { postsRoutes} from './routes/posts.js'
import  bodyParser  from 'body-parser'
import {userRoutes} from './routes/users.js'

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }
    next()
})

postsRoutes(app)
userRoutes(app)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.error('[JWT]', err.message) // e.g. "No authorization token was found", "jwt malformed", "invalid signature", "jwt expired"
        return res.status(401).json({ error: err.message })
    }
    next(err)
})

app.use((req, _res, next) => {
    if (req.method === 'PATCH' && req.path === '/api/v1/user') {
        console.log('[AUTHZ]', req.headers.authorization)
    }
    next()
})

app.get('/', (req, res) => {
    res.send('Hello From Express!')
}) 

export default app