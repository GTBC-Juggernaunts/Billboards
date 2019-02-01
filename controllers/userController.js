const models = require('../models');

module.exports =  {
  findUserById: function(req, res) {
    models.User
      .findOne(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findAllUsers: function(req,res) {
    models.User
      .find()
      .then(dbUser => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    models.User
      .create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    models.User
      .findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};