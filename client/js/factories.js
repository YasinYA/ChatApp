angular.module('ChatApp')
	.factory('Login', ['$resource', function ($resource) {
		return $resource('/api/login', {
			save: {method : 'POST'}
		});	
	}])
	.factory('Register', ['$resource', function ($resource) {
		return $resource('/api/register', {
			save: {method : 'POST'}
		});
	}])
	.factory('Profile', ['$resource', function ($resource) {
		return $resource('/api/profile', {
			get: {method:'GET', isArray: false}
		});
	}])
	.factory('Chat', ['$resource', function ($resource) {
		return $resource('/api/chat', {
			get: {method: 'GET', isArray: false}
		});
	}]);
	