import { createUser, loginUser, getUserInfoById, deleteUser, updateUser} from "../services/users.js"
import { requireAuth } from '../middleware/jwt.js'


export function userRoutes(app) {
    app.get('/api/v1/users/:id', async (req, res) => {
        const userInfo = await getUserInfoById(req.params.id)
        return res.status(200).send(userInfo)
    })

    app.post('/api/v1/user/signup', async (req, res) => {
        try {
            const user = await createUser(req.body)
            return res.status(201).json({username: user.username})
        } catch (error) {
            console.error('Error adding user:', error)
            return res.status(400).json({
                error: 'Failed to create user, does the username already exist?'
            })
        }
    })

    app.post('/api/v1/user/login', async (req, res) => {
        try {
            const { token } = await loginUser(req.body)
            return res.status(200).send({ token })
        } catch (error) {
            return res.status(400).send({
                error: 'Invalid username or password'
            })
        }
    })

    app.patch('/api/v1/user', requireAuth, async (req, res) => {
        try {
            const user = await updateUser(req.auth.sub, req.body)
            return res.json(user)             
        } catch (error) {
            console.error('Error updating user:', error)
            return res.status(500).end()
        }
    })

    app.delete('/api/v1/user', requireAuth, async (req, res) => {
        try {
            const deleted = await deleteUser(req.auth.sub)

            if (!deleted || deleted.deletedUsers === 0) {
                return res.status(404).end()
            }

            return res.status(204).end()  
        } catch (error) {
            console.error('Error deleting user:', error)
            return res.status(500).end()
        }
    })
}
