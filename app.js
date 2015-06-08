var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

var publicPath = path.join(__dirname, './public');
var nodeModulesPath = path.join(__dirname, './node_modules');

var TaskModel = require('./models/task-model');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(publicPath));
app.use(express.static(nodeModulesPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000)

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/views/index.html')
})


app.get('/tasks', function(req, res, next) {

  TaskModel.find({}, function(err, tasks) {
    if (err) return next(err)
    res.send(tasks);
  })

})

app.post('/', function(req, res) {

  var newTask = req.body;

  TaskModel.create(newTask).then(function (newTask) {
    res.send(newTask);
  }, function (err) {
    res.status(500).send(err.message);
  });

})

app.delete('/', function(req, res) {
  var finishedTask = req.body;

  TaskModel.findOneAndRemove(req.body).then(function(finished) {
    res.send(finished)
  }, function (err) {
    res.status(500).send(err.message);
  })

})

app.put('/', function(req, res) {
  var id = req.body.id;
  var task = {task: req.body.task};

  TaskModel.findOneAndUpdate(id, task).then(function(updated) {
    res.send(updated)
  }, function(err) {
    res.status(500).send(err.message);
  })
})
