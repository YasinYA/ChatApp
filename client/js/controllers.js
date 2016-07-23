angular.module('ChatApp')
	.controller('LoginController', ['Login','$state', '$rootScope', function (Login, $state, $rootScope) {
		var vm = this;

		vm.loginHandler = function() {
			var user = {
				username: vm.username,
				password: vm.password
			};

			vm.checker = Login.save(user, function(res) {
				if(res.user) {
					$state.go('profile');
					$rootScope.users = true;
				}else {
					vm.message = "Invalid user";
					vm.show = true;
					$state.go('login');
				}
			});

		};

	}])
	.controller('RegisterController', ['Register', '$state', '$rootScope', function (Register, $state, $rootScope) {
		var vm = this;

		vm.registerationHandler = function() {
			var newUser = {
				name: vm.name,
				email: vm.email,
				country: vm.country,
				username: vm.username,
				password: vm.password
			};

			vm.saveCredentials = Register.save(newUser, function(res) {
				if(res.user) {
					$state.go('profile');
					$rootScope.users = true;
				}else {
					$state.go('register');
				}
			});
		}
	}])
	.controller('ProfileController', ['Profile', function (Profile) {
		var vm = this;

		vm.users = Profile.get();
		vm.users.$promise.then(function(res) {
			if(res.user) {
				vm.name = res.user.name;
				vm.email = res.user.email;
				vm.country = res.user.country;
			}
		});
	}])
	.controller('ChatController', ['Chat', '$scope', function (Chat, $scope) {
		var vm = this;

		vm.user = Chat.get();

		vm.greater = '';

		var socket = io.connect();
		socket.on('welcome', angular.bind(this, function(data) {
			$scope.$apply(function() {
				vm.message = data.msg;
				vm.greater = data.sender;
			});
		}));


		vm.chatHandler = function() {
			

			
		};

	}]);