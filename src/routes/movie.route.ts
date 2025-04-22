import express from 'express'
import { createMovie, deleteMovie, getMovieById, getMovieByTitle, getMovies, updateMovie } from '../controllers/movie.controller'

const movieRouter = express.Router()

movieRouter.get('/', getMovies) 
movieRouter.get('/:id', getMovieById) 
movieRouter.get('/movie/:title', getMovieByTitle)
movieRouter.post("/", createMovie)
movieRouter.put('/:id', updateMovie)
movieRouter.delete("/:id", deleteMovie)

export default movieRouter