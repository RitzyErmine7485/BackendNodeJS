// Imports
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

// Connection
connectDB()
const port = process.env.PORT || 5000;
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/assignments', require('./routes/assignmentRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Error handling
app.use(errorHandler)

// Listening
app.listen(port, () => console.log(`Working on port: ${port}`))
