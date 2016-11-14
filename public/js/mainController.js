(function(){
  angular
  .module('WineApp')
  .controller('WineController', function($http, $state, Flash, Upload, $scope){
    var self = this;
    this.adding = false;
    var rootUrl = 'http://localhost:3000';
    // var rootUrl = 'https://wine-o-clock-api.herokuapp.com';

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
      .then(function(response) {
        console.log(response);
        self.bottles = response.data.bottles;
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.startAdding = function() {
      this.adding = true;
    }

    this.addBottle = function(bottle) {
      console.log(bottle);
      return $http({
        url: `${rootUrl}/bottles/results/${bottle.search}`,
        method: 'GET'
      })
      .then(function(response) {
        console.log(response);
        bottle = response.data;
        return $http({
          url: `${rootUrl}/users/${self.user.id}/bottles`,
          method: 'POST',
          data: bottle
        })
        .then(function(response) {
          var id = response.data.bottle.id;
          bottle.id = id;
          self.bottles.push(bottle);
          console.log('update bottles>>', self.bottles);
          self.adding = false;
          if (response.data.bottle.red_or_white === 'Red Wines') {
            $state.go('reds', {url: '/reds'});
          } else {
            $state.go('whites', {url: '/whites'});
          }
        })
        .catch(function(err) {
          console.log(err);
        })
      })
    }

    this.showBottle = function(id) {
      console.log(id);
      return $http({
        url: `${rootUrl}/users/${self.user.id}/bottles/${id}`,
        method: 'GET'
      })
      .then(function(response) {
        console.log(response);
        self.bottle = response.data.bottle;
        self.image = response.data.image;
      })
    }

    this.deleteBottle = function(id) {
      console.log(id);
      console.log(self.user.id);
      return $http({
        url: `${rootUrl}/users/${self.user.id}/bottles/${id}`,
        method: 'DELETE'
      })
      .then(function(response) {
        self.bottle = {};
        $state.go('cellar', {url: '/cellar'});
        warnAlert('Bottle deleted!')
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.updateBottle = function(bottle, id) {
      // console.log(bottle);
      return $http({
        url: `${rootUrl}/users/${self.user.id}/bottles/${id}`,
        method: 'PATCH',
        data: {bottle: bottle}
      })
      .then(function(response) {
        console.log(response);
        $state.go('bottle', {url: '/bottle'});
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.changeLabel = function(image, id) {
      console.log(image);
      console.log(id);
      image.upload = Upload.upload({
        url: `${rootUrl}/users/${self.user.id}/bottles/${id}`,
        method: 'PATCH',
        data: {bottle: {image: image}}
      })
      .then(function(response) {
        console.log(response);
        self.showBottle(id);
        $state.go('bottle', {url: '/bottle'});
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
