const models = require('../models');

module.exports =  {
  findNextPromos: function(req, res) {
    models.Promotion
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};