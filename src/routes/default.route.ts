import express from 'express'

const router = express.Router()

router.get('/', (req,res)=>{
  res.status(200).json({alive: "True"})
})

export default router