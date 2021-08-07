

const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_URL || 'mongodb://localhost/ztMernLocalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;