import express from 'express'
import { createUser } from '../controllers/user/createUserController.js'
import { listUser } from '../controllers/user/listUserController.js'
import { getUser } from '../controllers/user/getUserController.js'
import { updateUser } from '../controllers/user/updateUserController.js'
import { deleteUser } from '../controllers/user/deleteUserController.js'

const router = express.Router()

router.post('/users', createUser)
router.get('/users', listUser)
router.get('/users/:id', getUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router