// app.js - Main application file
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import albumRoutes from './routes/albums.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/albums', albumRoutes)

// Connect to MongoDB and start server
async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB!')
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

startServer()

export default app