let express = require('express');
let multer = require('multer');
let upload = multer({ dest : '../test_upload/' });

let router = express.Router();

router.use(require('../config/flash'));

router.get('/new-rally', function (req, res) {
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
    res.redirect('/');
  } else {
    res.render('new-rally', { title : 'Nouvelle compétition', project : 'Volna' });
  }
});

router.post('/new-rally/control', upload.single('kml_file'), function (req, res) {
  console.log(req.files);
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
    res.redirect('/');
  } else {
    let pilots = [];
    let stringChecker = require('../class/stringCheck');
    if (stringChecker.isEmpty(req.body.rally_name) === true) {
      req.flash('error', 'Veuillez donner un nom à la compétition');
      res.redirect('/tracker/new-rally');
    } else {
      let error = false;
      let i = 0;
      for (let element in req.body) {
        if (element.substr(0, 10) === 'reg_number') {
          let registration = req.body[element].trim().toUpperCase();
          if (registration.length !== 0) {
            if (registration.length === 6) {
              pilots[i] = registration;
              i++;
            } else {
              error = true;
            }
            registration.substr(0, 2) === 'F-' ? error = error : error = true;
          }
        }
      }
      if (error === true) {
        res.redirect('/tracker/new-rally');
      } else {
        res.send('Insertion réussi');
      }
    }
  }
});

module.exports = router;