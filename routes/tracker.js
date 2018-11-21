let express = require('express');
let path = require('path');
let fileUpload = require('express-fileupload');

let router = express.Router();

router.use(require('../config/flash'));
router.use(fileUpload());

router.get('/rally/:rally_id', function (req, res) {
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
    res.redirect('/');
  } else {
    let mysql = require('../class/mysql');
    mysql.getRallyInformation(req.params.rally_id, function(rallyID) {
      res.send(rallyID);
    });
  }
});

router.get('/new-rally', function (req, res) {
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
    res.redirect('/');
  } else {
    res.render('new-rally', { title : 'Nouvelle compétition', project : 'Volna' });
  }
});

router.post('/new-rally/control', function (req, res) {
  if (req.session.login === undefined || '') {
    req.flash('error', 'Veuillez vous connecter d\'abord');
  } else {
    let hasher = require('../class/hasher');
    let fileName = hasher.createKMLId();
    let formular = {
      pilots : [],
      rally_type : req.body.rally_type,
      rally_name : req.body.rally_name,
      rally_id : hasher.createRallyID(),
      kml_file_name : fileName
    };
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
        formular.pilots = pilots;
        if (error === true) {
          res.redirect('/tracker/new-rally');
        } else {
          if (Object.keys(req.files).length === 0) {
            return res.status(400).send('No files uploaded');
          }
          let KMLFile = req.files.kml_file;
          KMLFile.mv(path.join(__dirname, '../test_upload/') + fileName + '.kml', function (error) {
            if (error) return res.status(500).send(error);
            let Mysql = require('../class/mysql');
            Mysql.createCompetition(formular, function (results) {
              res.redirect('/tracker/rally/' + formular.rally_id);
            });
          });
        }
      }
    }
  }
});

module.exports = router;