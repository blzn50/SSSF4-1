'use strict';
class Database {
  constructor() {
    this.mongoose = require('mongoose');
  };

  connect(url, app, port) {
    this.mongoose.connect(url).then(() => {
      console.log('Connected successfully.');
      app.listen(port, () => console.log(`server running on port ${port}`));
    }, (err) => {
      console.log('Connection to db failed: ' + err);
    });
  }
}

module.exports = new Database();