const models = require('../models');

module.exports =  {
  findNextPromo: function(req, res) {
    models.Promotion
      .findOne(req.query)
      .then(dbPromo => res.json(dbPromo))
      .catch(err => res.status(422).json(err));
  }
};