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

}

module.exports = Mysql;
