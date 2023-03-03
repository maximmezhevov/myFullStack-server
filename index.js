import express from 'express'

const PORT = 3001

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
