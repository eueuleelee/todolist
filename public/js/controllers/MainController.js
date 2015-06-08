app.controller('MainController', function($scope, TodolistFactory) {

  $scope.edit = false;

  $scope.getList = function () {
    TodolistFactory.getList().then(function(tasks) {
      $scope.list = tasks; //array
    })
  }

  $scope.getList();

  $scope.newTask = {task: null}

  $scope.addTask = function() {
    var task = $scope.newTask

    // TodolistFactory.addTask
    TodolistFactory.addTask(task);

    //clear new Task field
    $scope.newTask = {task: null}
  }

  var selectedTask = null;

  $scope.selectTask = function (task) {
    selectedTask = task;
  }

  $scope.editTask = {task: null}

  $scope.showeditTask = function() {
    $scope.edit = true;
  }

  $scope.editTask = function () {
    var task = $scope.editTask.task;
    var reqbody = {id: selectedTask._id, task: task}
    TodolistFactory.editTask(reqbody);
    $scope.editTask = {task: null}
    selectedTask = null;
    $scope.edit = false;
  }

  $scope.finishTask = function() {
    TodolistFactory.deleteTask(selectedTask);
    selectedTask = null;
  }

  $scope.hideTask = function() {
    $scope.edit = false;
  }


})
