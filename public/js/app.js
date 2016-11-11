(function() {
  angular
    .module('WineApp', ['ui.router'])
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

    // .state('profile', {
    //   url: '/profile',
    //   templateUrl: 'profile.html',
    // })
    // .state('about', {
    //   url: '/about',
    //   templateUrl: 'about.html',
    // })
    // .state('profile.changePass', {
    //   url: '/changePass',
    //   templateUrl: 'changePass.html'
    // })

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }); //locationProvider

  } //MainRouter closure
})()
