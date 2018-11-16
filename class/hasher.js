"use strict";

let bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(15);

class Hasher {

  static hash(stringToHash) {
    return bcrypt.hashSync(stringToHash, salt);
  }

  static compare(stringToCompare, hash) {
    return bcrypt.compareSync(stringToCompare, hash);
  }

  static createRallyID() {
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
    let id = '';
    for (let i = 0; i < 20; i++) {
      let index = Math.floor(Math.random() * Math.floor(string.length));
      id += string.substr(index, 1);
    }
    return id;
  }

  static createKMLId() {
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
    let id = '';
    for (let i = 0; i < 30; i++) {
      let index = Math.floor(Math.random() * Math.floor(string.length));
      id += string.substr(index, 1);
    }
    return id;
  }

}

module.exports = Hasher;