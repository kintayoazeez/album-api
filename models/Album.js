// models/Album.js - Album schema
import { Schema, model } from 'mongoose'

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [50, 'Title must be at most 50 characters']
  },
  artist: {
    type: String,
    required: true,
    minlength: [3, 'Artist name must be at least 3 characters'],
    maxlength: [50, 'Artist name must be at most 50 characters']
  },
  year: {
    type: Number,
    required: true,
    min: [1900, 'Year must be 1900 or later'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  genre: {
    type: String,
    required: true
  },
  trackCount: {
    type: Number,
    min: [1, 'Track count must be greater than 0'],
    max: [100, 'Track count must be at most 100']
  }
})

export default model('Album', albumSchema)