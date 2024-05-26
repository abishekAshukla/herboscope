const express = require('express')
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000

connectDB()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/node', (req, res) => {
  res.send('herboscope backend')
})
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
