import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()
const PORT = process.env.PORT

const app = express()

const server = async () => {
  try {
    await mongoose.connect(process.env.mongoose, console.log('mongoose connected'))
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
server()

app.get('/', (req, res) => {
  res.send('hello world')
})
