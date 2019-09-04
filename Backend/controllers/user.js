const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role
      });
      console.log(user);
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid authentication credentials!',
            error: err
          });
        });
    });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    // Email and password match, create token
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role},
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    // Return token in response
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      role: fetchedUser.role
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  });
}

exports.getUsers = (req, res, next) => {
  User.find({})
  .then((data)=>{
   res.status(200).json(data);
   })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({
       message: 'Fetching users failed!',
       error: err
     });
   });
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(
        {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      );
    } else {
      res.status(404).json({message: 'User not found!'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Fetching user failed!',
      error: err
    });
  });
}

exports.deleteUser = (req, res, next) => {
  // params gives access to all encoded parameters (id in this case)
  User.deleteOne({ _id: req.params.id }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Deletion successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: 'Deleting user failed!',
      error: err
    });
  });
}

exports.updateUser = (req, res, next) => {
  let user;
  if(req.body.password){
    bcrypt.hash(req.body.password, 10).then(
      hash => {
        user = new User({
          _id: req.params.id,
          email: req.body.email,
          password: hash,
          role: req.body.role
        });
      }
    )
  } else {
    user = new User({
      _id: req.params.id,
      email: req.body.email,
      role: req.body.role
    });
  }
  User.updateOne({ _id: req.params.id }, user).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Couldn't update user!",
      error: err
    });
  });
}
