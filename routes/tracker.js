let express = require('express');
let router = express.Router();

router.use(require('../config/flash'));

router.get('/', function (req, res, next) {
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
    res.redirect('/');
  } else {
    res.render('tracking', { title : 'Tracking', project : 'Volna'});
  }
});

module.exports = router;