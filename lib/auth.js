var jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;

function Auth() {}

Auth.prototype.ensureAuthorized = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.send(403);
      } else {
        req.auth = decoded
        next()
      }
    })
  } else {
    res.send(403);
  }
}

Auth.prototype.createToken = (user) => {
	let time = new Date().getTime()
	var obj = {
    user,
    time 
  };
	return jwt.sign(obj, process.env.SECRET)
}

Auth.prototype.passwordHash = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

Auth.prototype.passwordCompare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

module.exports = new Auth()