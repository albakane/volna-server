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

}

module.exports = Hasher;