var express = require('express');
var router = express.Router();
var User = require('./../models/user.js');
const Auth = require('./../lib/auth')
const Roles = require('./../enums/roles')
const DateService = require('./../lib/date')

router.post('/signin', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    res.status(400)
      .json({
        data: "Invalid username or password!"
      });
    return
  }

  try {
    let user = await User.findOne({ username })

    if (user) {
      res.status(400)
        .json({
          data: "User already exists!"
        });
      return
    }
    var userModel = new User()
    userModel.username = req.body.username
    userModel.password = Auth.createPasswordHash(req.body.password)
    userModel.role = Roles.user
    userModel.active = true

    await userModel.save()
    res.json({
      data: true
    })

  } catch (e) {
    console.log(e)
    res.status(400)
      .json({
        data: "error"
      });
  }
});

router.post('/login', async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    res.status(400)
      .json({
        data: "Invalid username or password!"
      });
    return
  }

  try {
    let user = await User.findOne({ username })
    if (!user || !Auth.passwordCompare(password, user.password)) {
      res.status(400)
        .json({
          data: "Invalid username or password!"
        });
      return
    }
    if (!user.active) {
      res.status(400)
        .json({
          data: "Inactive user!"
        });
      return
    }
    let dateNow = DateService.getToday()
    await User.findOneAndUpdate({ username }, { lastLogin: dateNow })

    const userToken = {
      id: user._id,
      role: user.role
    }
    let token = Auth.createToken(userToken)
    res.json({
      data: token
    })

  } catch (e) {
    console.log(e)
    res.status(400)
      .json({
        data: "error"
      });
  }
});

router.get('/me', Auth.ensureAuthorized, async (req, res, next) => {
  let authUser = req.authUser

  try {
    let user = await User.findOne(
      { _id: authUser.id },
      { _id: true, username: true, lastLogin: true })
    
    let resUser = {
      id: user._id,
      username: user.username,
      lastLogin: DateService.getDate(user.lastLogin)
    }

    res.json({
      data: resUser
    })
  } catch (e) {
    console.log(e)
    res.status(400)
      .json({
        data: "error"
      })
  }
});

router.get('/', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    let user = await User.find({})
    res.json({
      data: users
    })
  } catch (e) {
    console.log(e)
    res.status(400)
      .json({
        data: "error"
      })
  }
});

module.exports = router;