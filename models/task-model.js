var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');
mongoose.connection.on('error', console.log.bind(console, 'connection error:'));

var schema = new mongoose.Schema({
  task: String
})

module.exports = mongoose.model('Todo', schema);
