const jwt = require('jsonwebtoken');
import User from '../models/user'
const mongoose = require('mongoose')

export const tokenForUser = function(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({sub: user.id, iat: timestamp}, process.env.SECRET || 'apollo-test')
}

exports.signin = function (req, res, next) {
  User.findOne({username: req.body.username})
  .then(user => {
    if (!user) {
      res.status(401).send({error: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          res.json({success: true, token: tokenForUser(user)});
        } else {
          res.status(401).send({error: 'Authentication failed. Wrong password.'});
        }
      });
    }
  })
  .catch(err => {throw err;});
}

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(401).send({error: 'You must provide username and password'});
  } else {
    const user = new User({username, password});

    user.save()
    .then(() => res.json({success: true, msg: 'Successful created new user.'}))
    .catch((err) => res.status(401).send({error: 'Username already exists.'}));

  };
}

exports.me = function(req, res, next) {
  res.json({_id: req.user._id, username: req.user.username, role: req.user.role});
}

exports.update = function(req, res, next) {
  let user = req.body.user;
  //console.log(user);
  User.findByIdAndUpdate(req.user._id, {$set: {mobileNo: user.mobileNo, dispName: user.dispName}}, {new: true}, (err, user) => {
    logger.info(`${user.dispName} updated`);
  	res.json({result: 'success'});
  })
}

exports.getusers = function(req, res, next) {
    if (req.user.role != 'admin') {
        throw new Error('not permitted');
    }
    User.find({}, (error, users)=>{
        res.json(users.map((user)=>({id: user.id, dispName: user.dispName, role: user.role})));
    });
}

exports.changePassword = function(req, res, next) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Check if user is in database
    User.findOne({
        _id: mongoose.Types.ObjectId(req.user._id)
    }, function(err, existingUser) {

        if (err) {
            return res.json({ error: 'Error accessing account. Try again later' })
        }

        if (existingUser) {
            if (!existingUser.validPassword(oldPassword)) {
                return res.json({ error: '密码不匹配' });;
            }
            existingUser.password = existingUser.generateHash(newPassword);
            // Update user in database
            User.update({
                _id: mongoose.Types.ObjectId(req.user._id)
            }, existingUser, function(err) {
                if (err) {
                    return res.json({ error: 'Error updating password. Try again later' })
                }

                // Find and return updated user  - note this is necessary because update does not return the doc
                User.findOne({
                    _id: mongoose.Types.ObjectId(req.user._id)
                },'-password', function(err, returnUser) {
                    res.json(returnUser)
                })
            });
        }
        else {
            // Could not find user to update in db
            return res.json({ error: 'Hmm...Cannot locate account. Try again later' })
        }
    });
}