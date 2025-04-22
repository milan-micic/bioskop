import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  })

const Movie = mongoose.model('Movie', movieSchema)

export default Movie