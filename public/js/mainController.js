(function(){
  angular
  .module('WineApp')
  .controller('WineController', function($http, $state, Flash){
    var self = this;
    var rootUrl = 'http://localhost:3000';

    this.signup = function(user) {
      console.log(user);
      self.signed = user;
      return $http({
        url: `${rootUrl}/users`,
        method: 'POST',
        data: {user: user}
      })
      .then(function(response) {
        if (response.data.status === 200) {
          console.log('success');
          self.success = true;
          self.login(self.signed);
        } else {
          console.log(response)
          if (response.data.user.email) {
            failAlert('Registration failed: email ' + response.data.user.email[0]);
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.login = function (user) {
      return $http({
        url: `${rootUrl}/users/login`,
        method: 'POST',
        data: {user: user}
      })
      .then(function(response) {
        if (response.data.status == 401){
          failAlert('Unauthorized! Check your username and password!')
        }
        passAlert('<strong>Success!</strong> Welcome, ' + response.data.user.first_name + '.')
        self.user = response.data.user;
        self.allBottles(self.user.id);
        console.log('token >>>', response.data.token);
        localStorage.setItem('token', JSON.stringify(response.data.token))
          $state.go('cellar', {url: '/cellar', user: response.data.user})
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.logout = function() {
      self.user = null;
      self.success = null;
      self.repeatText = "";
      localStorage.removeItem('token');
      warnAlert('You have been logged out.');
      $state.go('home', {url: '/'});
    }

    this.allBottles = function(id) {
      console.log(id);
      return $http({
        url: `${rootUrl}/users/${id}/bottles`,
        method: 'GET'
      })
    }

    // FLASH
    function passAlert(msg){
      var id = Flash.create('success', msg, 7000, {class: 'flashAlert'}, true);
    }
    function failAlert(msg){
      var id = Flash.create('danger', msg, 7000, {class: 'flashAlert'}, true);
    }

    function warnAlert(msg){
      var id = Flash.create('warning', msg, 7000, {class: 'flashAlert'}, true);
    }

  }); //controller closure
})()
