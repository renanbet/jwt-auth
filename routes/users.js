var express = require('express');
var router = express.Router();
var User = require('./../models/user.js');
const Auth = require('./../lib/auth')

router.post('/signin', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    res.status(400)
    .json({
      data: "Invalid username or password!"
    });
    return
  }
  User.findOne({ username })
    .then(user => {
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

      userModel.save()
        .then(user => {
          res.json({
            data: true
          });
        })
        .catch(err => {
          res.status(400)
          .json({
            data: "error"
          });
        })
    })
    .catch(err => {
      res.status(400)
      .json({
        data: "error"
      });
    })
});

router.post('/login', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
      res.status(400)
      .json({
        data: "Invalid username or password!"
      });
      return
    }
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(400)
        .json({
          data: "error"
        });
      } else {
        if (!user || !Auth.passwordCompare(password, user.password)) {
          res.status(400)
          .json({
            data: "Invalid username or password!"
          });
          return
        }
        let token = Auth.createToken(user)
        res.json({
          data: token
        });
      }
    });
  });

router.get('/me', Auth.ensureAuthorized, (req, res, next) => {
    let authUser = req.authUser
    User.findOne({ username: authUser.username }, function (err, user) {
      if (err) {
        res.status(400)
        .json({
          data: "error"
        });
      } else {
        res.json({
          data: user
        });
      }
    });
  });

module.exports = router;