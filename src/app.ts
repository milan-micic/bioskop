import express from "express"
import cors from 'cors'
import movieRoutes from "./routes/movie.route"
import router from "./routes/default.route"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", router)
app.use("/movies", movieRoutes)

export default app