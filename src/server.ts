import dotenv from "dotenv"
import app from "./app"
import connectDB from "./config/db"

dotenv.config()

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port}`))
connectDB()
