"use strict";

class StringCheck {

  static isEmpty (string) {
    let emptyState = true
    string.trim() === '' || undefined ? emptyState = true : emptyState = false
    return emptyState
  }

}

module.exports = StringCheck;