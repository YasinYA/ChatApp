angular
	.module('ChatApp', ['ui.router', 'ngResource'])
	.config(['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider) {
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
			});
	}]);