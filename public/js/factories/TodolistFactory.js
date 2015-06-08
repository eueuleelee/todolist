app.factory('TodolistFactory', function($http) {
  return {
    addTask: function(task) {
      return $http.post('/', task).then(function (response) {
        return response.data;
      });
    },

    getList: function() {
      return $http.get('/tasks').then(function(response) {
        console.log('return from getlist', response.data)
        return response.data;
      })
    },

    deleteTask: function(task) {
      return $http.delete('/', task).then(function(response) {
        return response.data;
      })
    },

    editTask: function(reqbody) {
      return $http.put('/', reqbody).then(function(response) {
        return response.data;
      })
    }
  }
})
