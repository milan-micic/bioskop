import mongoose from "mongoose"
import Movie from "../models/movie.model"
import { Request, Response } from "express"

export const getMovies = async (req:Request, res:Response):Promise<any> => {
  try {
    const movies = await Movie.find({})
    res.status(200).json({ success: true, movies: movies})
  } catch (error: any) {
    console.error("Error in fetching movies:", error.message)
    res.status(500).json({ success: false, message: "Server Error"})
  }
}

export const getMovieById = async (req:Request, res:Response):Promise<any> => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Movie Id" })
  }

  try {
    const movie = await Movie.findById(id)
    res.status(200).json({ success: true, movie: movie})
  } catch (error: any) {
    console.error("Error in fetching movie:", error.message)
    res.status(500).json({ success: false, message: "Server Error"})
  }
}

export const getMovieByTitle = async (req:Request, res:Response):Promise<any> => {
  const { title } = req.params

  try {
    const movie = await Movie.find({title})
    if (movie.length !== 0) {
      res.status(200).json({ success: true, movie: movie})
    } else {
      res.status(404).json({ success: false, message: "Movie Not Found"})
    }
  } catch (error: any) {
    console.error("Error in fetching movie:", error.message)
    res.status(500).json({ success: false, message: "Server Error"})
  }
}

export const createMovie = async (req:Request, res:Response):Promise<any> => {
  const movie = req.body

  if (!movie.title || !movie.videoLink) {
    return res.status(400).json({ success: false, message: "Please provide all fields" })
  }

  movie.videoLink = encodeURI(movie.videoLink)
  const newMovie = new Movie(movie)

  try {
    await newMovie.save()
    res.status(201).json({ success: true, movie: newMovie })
  } catch (error:any) {
    console.error("Error in create movie:", error.message)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const updateMovie = async (req:Request, res:Response):Promise<any> => {
  const { id } = req.params
  const movie = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Movie Id" })
  }

  try {
    const updateMovie = await Movie.findByIdAndUpdate(id, movie, { new:true })
    res.status(200).json({ success: true, movie: updateMovie })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const deleteMovie = async (req:Request, res:Response):Promise<any> => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Movie Id" })
  }

  try {
    await Movie.findByIdAndDelete(id)
    res.status(200).json({success: true, message: "Movie Deleted"})
  } catch (error:any) {
    console.error("Error in deleting movie:", error.message)
    res.status(500).json({success: false, message: "Server Error"})
  }
}