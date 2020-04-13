var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')
const Auth = require('./../lib/auth')

router.post('/signin', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  try {
    if (!username || !password) {
      throw { error: "Invalid username or password!" }
    }
    let ret = await userController.insert(username, password)
    res.json({data: ret})
  } catch (error) {
    console.log(error)
    res.status(400)
      .json(error);
  }
});

router.post('/login', async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  try {
    if (!username || !password) {
      throw { error: "Invalid username or password!" }
    }
    let ret = await userController.login(username, password)
    res.json({data: ret})
  } catch (error) {
    console.log(error)
    res.status(400)
      .json(error);
  }
});

router.get('/me', Auth.ensureAuthorized, async (req, res, next) => {
  let authUser = req.authUser

  try {
    let ret = await userController.get(authUser.id)
    res.json({data: ret})
  } catch (error) {
    console.log(error)
    res.status(400)
      .json(error);
  }
});

router.get('/', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    let ret = await userController.getAll()
    res.json({data: ret})
  } catch (error) {
    console.log(error)
    res.status(400)
      .json(error)
  }
});

module.exports = router;