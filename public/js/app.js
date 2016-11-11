(function() {
  angular
    .module('WineApp', ['ui.router', 'ngFlash'])
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

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }); //locationProvider

  } //MainRouter closure
})()
