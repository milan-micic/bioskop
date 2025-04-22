import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI as string)
    console.log(`Connected to DB: ${conn.connection.host}`)
  } catch (error: any) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB