import { body } from "express-validator";

export const signUpValidaton = [
  body('email', 'invalid email value').isEmail(),
  body('username', 'invalid username value').isLength({min: 3}),
  body('password', 'invalid password value').isLength({min: 6}),
  body('avatarUrl', 'invalid avatarUrl value').optional().isURL()
]