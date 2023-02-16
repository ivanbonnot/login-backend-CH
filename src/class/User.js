class User {
    constructor(user, email, password) {
      this.timestamp = Date.now();
      this.user = user;
      this.email = email;
      this.password = password;
    }
  }
  
  module.exports = User;