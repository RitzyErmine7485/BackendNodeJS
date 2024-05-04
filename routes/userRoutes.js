const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {login, register, showdata, updateUser, deleteUser} = require('../controllers/userController')

router.post('/login', login)
router.post('/register', register)
router.get('/data', protect, showdata)
router.put('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)

module.exports = router