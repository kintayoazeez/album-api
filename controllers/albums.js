// controllers/albums.js
import Album from '../models/Album.js'

export async function getAllAlbums(req, res) {
  try {
    const albums = await Album.find({}).exec()
    res.json(albums)
  } catch {
    res.status(500).json({ error: 'Failed to load albums' })
  }
}

export async function getAlbumById(req, res) {
  try {
    const album = await Album.findById(req.params.id).exec()
    if (!album) {
      return res.status(404).json({ error: 'Album not found' })
    }
    res.json(album)
  } catch {
    res.status(500).json({ error: 'Failed to load album' })
  }
}

export async function createAlbum(req, res) {
  try {
    const { title, artist, year, genre, trackCount } = req.body
    if (!title || !artist || !year || !genre) {
      return res.status(400).json({ error: 'title, artist, year and genre are required' })
    }
    const album = await Album.create({ title, artist, year, genre, trackCount })
    res.status(201).json(album)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message)
      return res.status(400).json({ error: messages.join(', ') })
    }
    res.status(500).json({ error: 'Failed to create album' })
  }
}

export async function updateAlbum(req, res) {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!album) {
      return res.status(404).json({ error: 'Album not found' })
    }
    res.json(album)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message)
      return res.status(400).json({ error: messages.join(', ') })
    }
    res.status(500).json({ error: 'Failed to update album' })
  }
}

export async function deleteAlbum(req, res) {
  try {
    const album = await Album.findByIdAndDelete(req.params.id)
    if (!album) {
      return res.status(404).json({ error: 'Album not found' })
    }
    res.json({ message: 'Album deleted', album })
  } catch {
    res.status(500).json({ error: 'Failed to delete album' })
  }
}