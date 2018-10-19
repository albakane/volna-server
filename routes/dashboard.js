let express = require('express');
let router = express.Router();

router.use(require('../config/flash'));

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
    res.redirect('/');
  } else {
    res.render('dashboard', { title: 'Tableau de bord', project : 'Volna' });
  }
});

module.exports = router;
