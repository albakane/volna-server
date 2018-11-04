let express = require('express');
let router = express.Router();

router.use(require('../config/flash'));

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login !== undefined || '') {
    req.flash('error', 'Veuillez vous deconnecter d\'abord');
    res.redirect('/dashboard');
  } else {
    res.render('index', { title: 'Page de connexion', project : 'Volna' });
  }
});

router.post('/connection', function(req, res, next) {
  if (req.session.login !== undefined || '') {
    req.flash('error', 'Veuillez vous déconnecter d\'abord');
    res.redirect('/dashboard');
  } else {
    let formular = {
      login : req.body.login,
      password : req.body.password
    };
    let Mysql = require('../class/mysql');
    Mysql.checkUserExists(formular, function(results) {
      if (results.error === true) {
        req.flash('error', results.content);
        res.redirect('/');
      } else {
        req.session.login = results.content;
        res.redirect('/dashboard');
      }
    })
  }
});

router.get('/connection', function(req, res, next) {
  res.redirect('/');
});

router.get('/disconnect', function(req, res, next) {
  if (req.session.login !== undefined || '') {
    req.session.login = undefined;
    res.redirect('/');
  }
});

module.exports = router;
