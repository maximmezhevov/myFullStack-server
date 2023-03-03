import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const PORT = process.env.PORT

const app = express()

const server = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
server()

app.get('/', (req, res) => {
  res.send('hello world')
})
