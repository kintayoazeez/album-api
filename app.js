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
export async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB!')
  const PORT = process.env.PORT || 3000
  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
  return server
}

// Only start server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  startServer()
}

export default app