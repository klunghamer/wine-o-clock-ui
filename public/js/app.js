(function() {
  angular
    .module('WineApp', ['ui.router', 'ngFlash', 'ngFileUpload', 'ngTouch'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../partials/_home.html',
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../partials/_signup.html',
    })
    .state('login', {
      url:'/login',
      templateUrl: '../partials/_login.html',
    })
    .state('cellar', {
      url: '/cellar',
      templateUrl: '../partials/_cellar.html',
    })
    .state('reds', {
      url: '/reds',
      templateUrl: '../partials/_reds.html',
    })
    .state('whites', {
      url: '/whites',
      templateUrl: '../partials/_whites.html'
    })
    .state('reds.add', {
      url: '/add',
      templateUrl: '../partials/_add.html'
    })
    .state('whites.add', {
      url: '/add',
      templateUrl: '../partials/_add.html'
    })
    .state('bottle', {
      url: '/bottle',
      templateUrl: '../partials/_bottle.html',
    })
    .state('bottle.update', {
      url: '/update',
      templateUrl: '../partials/_update.html',
    })

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }); //locationProvider

  } //MainRouter closure
})()
