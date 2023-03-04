import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'

export const signUp = async (request, response) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(404).json(errors)

    }
    
    const password = request.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const doc = new UserModel({
      email: request.body.email,
      username: request.body.username,
      // password: request.body.password,
      passwordHash: hash,
      avatarUrl: request.body.avatarUrl
    })
  
    const user = await doc.save()

    const token = jwt.sign({_id: user._id}, 'secret', {expiresIn: '30d'})

    const {passwordHash, ...userData} = user._doc

    response.json({...userData, token})

  } catch (error) {
    console.log(error);
    response.status(500).json({message: 'не удалось зарегистрироваться'})
  }
}

export const signIn = async (request, response) => {
  try {

    const user = await UserModel.findOne({email: request.body.email})
    if (!user) {
      return response.status(404).json({message: 'пользователь не найден'}) // неверный адрес электронной почты или пароль
    }

    const isValidPassword = await bcrypt.compare(request.body.password, user._doc.passwordHash)
    if (!isValidPassword) {
      return response.status(404).json({message: 'неверный пароль'}) // неверный адрес электронной почты или пароль
    }

    const token = jwt.sign({_id: user._id}, 'secret', {expiresIn: '30d'})

    const {passwordHash, ...userData} = user._doc

    response.json({...userData, token})

  } catch (error) {
    console.log(error);
    response.status(500).json({message: 'не удалось авторизоваться'})
  }
}

export const getMe = async (request, response) => {
  try {

    const user = await UserModel.findById(request.userId)
    if (!user) {
      return response.status(404).json({message: 'пользователь не найден'})
    }

    const {passwordHash, ...userData} = user._doc

    response.json(userData)

  } catch (error) {
    console.log(error);
    response.status(500).json({message: 'нет доступа'})
  }
}