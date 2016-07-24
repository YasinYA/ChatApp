angular
    .module('ChatApp', ['ui.router', 'ngResource', 'ngCookies'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'nav': {templateUrl: 'views/navbar.html'},
                    'content': {templateUrl: 'views/home.html'}
                }
            })
            .state('login',  {
                url: '/login',
                views: {
                    'nav': {templateUrl: 'views/navbar.html'},
                    'content': {templateUrl: 'views/login.html',
                                controller: 'LoginController as vm'}
                }
            })
            .state('register',  {
                url: '/register',
                views: {
                    'nav': {templateUrl: 'views/navbar.html'},
                    'content': {templateUrl: 'views/register.html',
                                controller: 'RegisterController as vm'}
                }
            })
            .state('profile',  {
                url: '/profile',
                views: {
                    'nav': {templateUrl: 'views/navbar.html'},
                    'content': {templateUrl: 'views/profile.html',
                                controller: 'ProfileController as vm'}
                },
                onEnter : ['$http', '$state',function($http, $state) {
                    $http.get('/api/profile').then(function(res) {
                        if(res.data.success === 'Authorized') {
                            $state.go('profile');
                        }else {
                            $state.go('login');
                        }
                    });
                }]
            })
            .state('chat',  {
                url: '/chat',
                views: {
                    'nav': {templateUrl: 'views/navbar.html'},
                    'content': {templateUrl: 'views/chat.html',
                                controller: 'ChatController as vm'}
                }
            })
            .state('logout', {
              url: '/logout',
              onEnter: ['$http', '$cookieStore', '$state', function($http, $cookieStore, $state) {
                // if the response is successfull this will delete the copied user cookies
                $http.get('/api/logout').then(function(res) {
                  $cookieStore.remove('user');
                  $state.go('home');
                });
              }]
            });
        $locationProvider.html5Mode(true);
    }])
    .run(['$rootScope', '$state', '$cookieStore',function ($rootScope, $state, $cookieStore) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        // this will take care showing or hiding of the logout botton regarding user's state
        var cookies = $cookieStore.get('user');
        if(cookies !== undefined) {
          $rootScope.user = true;
        }else if(cookies === undefined) {
          $rootScope.user = false;
        }
      });
    }]);
    