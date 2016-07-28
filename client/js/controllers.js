angular.module('ChatApp')
    .controller('LoginController', ['Login', '$state', '$cookieStore', function (Login, $state, $cookieStore) {
        var vm = this;
        vm.loginHandler = function() {
            var user = {
                username: vm.username,
                password: vm.password
            };
            vm.checker = Login.save(user, function(res) {
                if(res.message === 'Success') {
                    $cookieStore.put('user', res.userSession);
                    $state.go('profile');
                }else {
                    vm.message = "Invalid user";
                    vm.show = true;
                    $state.go('login');
                }
            });
        };
    }])
    .controller('RegisterController', ['Register', '$state', '$cookieStore', function (Register, $state, $cookieStore) {
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
                if(res.message === 'Success') {
                  $cookieStore.put('user', res.userSession);
                  $state.go('profile');
                }else {
                    $state.go('register');
                }
            });
        }
    }])
    .controller('ProfileController', ['Profile', '$rootScope', '$http', '$cookieStore', '$state', function (Profile, $rootScope, $http, $cookieStore, $state) {
        var vm = this;
        vm.users = Profile.get();
        vm.users.$promise.then(function(res) {
            if(res.success === 'Authorized') {
                vm.name = res.name;
                vm.email = res.email;
                vm.country = res.country;
            }
        });
    }])
    .controller('ChatController', ['Chat', '$scope', '$rootScope', function (Chat, $scope, $rootScope) {
        var vm = this;
        vm.user = Chat.get();
        vm.user.$promise.then(function(res){
          vm.name = res.userName;
          vm.userId = res.userId;
          vm.username = res.username
        });
        vm.greater = '';
        var socket = io.connect();
        socket.on('welcome', function(data) {
            $scope.$apply(function() {
                vm.message = data.msg;
                vm.greater = data.sender;
            });
        });
        vm.chatHandler = function() {
          socket.emit('chat', {
            name: vm.name,
            userId: vm.userId,
            message: vm.text
          });
          socket.on('message', function(data) {
            console.log(data);
          });
        };

    }]);
    