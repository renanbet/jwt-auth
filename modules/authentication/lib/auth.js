var jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const AuthRoutes = require('./auth.routes')
const saltRounds = 10;
const TOKEN_EXP = process.env.TOKEN_EXP
const TOKEN_EXP_REFRESH = process.env.TOKEN_EXP_REFRESH
const SECRET = process.env.SECRET

function Auth() {}

Auth.prototype.ensureAuthorized = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(401)
      } else {
        const user = decoded.user
        const path = `${req.baseUrl}${req.path}`
        
        let route = AuthRoutes.routes.find(item => {
          return item.path === path
        })
        if (route && route.roles.length && !route.roles.includes(user.role)) {
          res.sendStatus(401)
          return
        }

        let time = Math.floor(Date.now() / 1000)
        let exp = parseInt(decoded.exp)
        if (exp - time < parseInt(TOKEN_EXP_REFRESH)) {
          var obj = {
            user: decoded.user,
            exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXP)
          };
          let refreshToken = jwt.sign(obj, SECRET)
          res.setHeader('RefreshToken', refreshToken)
        }
        req.authUser = decoded.user
        next()
      }
    })
  } else {
    res.sendStatus(401);
  }
}

Auth.prototype.createToken = (user) => {
	var obj = {
    user,
    exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXP)
  };
	return jwt.sign(obj, process.env.SECRET)
}

Auth.prototype.createPasswordHash = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

Auth.prototype.passwordCompare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

module.exports = new Auth()