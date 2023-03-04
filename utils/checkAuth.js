import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoder = jwt.verify(token, 'secret')

      req.userId = decoder._id

      next()
      
    } catch (e) {
      return res.status(403).json({message: 'нет доступа'})
    }
  } else {
    return res.status(403).json({message: 'нет доступа'})
  }
}