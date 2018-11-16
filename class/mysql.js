"use strict";

let connection = require('../config/mysql-connection');
let path = require('path');

class Mysql {

  static checkUserExists (formular, callback) {
    if (formular.login.trim() === (undefined || '') || formular.password.trim() === (undefined || '')) {
      callback({error : true, content : 'Veuillez remplir les champs'});
    } else {
      connection.query("SELECT LOGIN, PASSWORD FROM ADMIN WHERE LOGIN = ?", [formular.login], function(error, results) {
        if (error) throw error;
        if (results.length === 0) {
          callback({error : true, content : 'Login incorrect'});
        } else {
          let Hasher = require(path.join(__dirname, 'hasher'));
          Hasher.compare(formular.password, results[0].PASSWORD) ? callback({error : false, content : results[0].LOGIN}) : callback({error : true, content : 'Mot de passe incorrect'});
        }
      });
    }
  }

  static createCompetition (formular, callback) {
    if (formular.pilots.length <= 0) {
      callback({error : true, content : 'Veuillez renseigner au moins un matricule'});
    } else {
      connection.query('INSERT INTO COMPETITION SET ?', {
        ID : formular.rally_id,
        KML_FILE_PATH : formular.kml_file_name,
        NAME : formular.rally_name,
        DATE : new Date(),
        TYPE : formular.rally_type
      }, function (error, results, fields) {
        if (error) {
          callback({error : true, content : 'Une erreur s\'est produite pendant la création'});
        } else {
          let pilots = [];
          for (let i = 0; i < formular.pilots.length; i++) {
            let pilot = [];
            pilot[0] = formular.pilots[i];
            pilots[i] = pilot;
          }
          connection.query('INSERT INTO PILOT (REG_NUMBER) VALUES ?', [pilots], function (error, results, fields) {
            if (error) {
              callback({error : true, content : 'Une erreur s\'est produite pendant la création'});
            } else {
              callback({error : false, content : 'RAS'});
            }
          });
        }
      });
    }
  }

  static getRallyInformation(rallyID) {
    connection.query('SELECT * FROM COMPETITION WHERE ID = ?', [rallyID], function (error, results, fields) {
      error ?
        callback({error : true, content : 'Une erreur s\'est produite durant le chargement de la page'}) :
        callback({error : false, content : results[0]});
    })
  }

}

module.exports = Mysql;
