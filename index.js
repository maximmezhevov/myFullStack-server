import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import { signUpValidaton } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js' // import { signUp, signIn, getMe} from './controllers/UserController'

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())

try {
  app.listen(PORT, async () => console.log(`server started on http://localhost:${PORT}`))
  await mongoose.connect(process.env.DB_URL, console.log('mongoose connected'))
} catch (error) {
  console.log(error)
}

// app.get('/', (request, response) => {
//   response.send('hello world')
// })

app.post('/auth/signUp', signUpValidaton, UserController.signUp)
app.post('/auth/signIn', UserController.signIn)
app.get('/auth/me', checkAuth, UserController.getMe)