/**
 * Created by LHZ on 2015/4/16.
 */
var moduleName = "issuesManagerSystem.angularUtils.signUpModule";

angular.module(moduleName, [])
    .controller('SignUpCtrl', ['$scope', '$location', 'imsFactory', function ($scope, $location, imsFactory) {
        $scope.user = {};
        $scope.user.action = 'userSignUp';
        $scope.user.info = {};
        $scope.user.info.username = '';
        $scope.user.info.password = '';
        $scope.passwordRetype = '';
        $scope.user.info.gender = 'male';
        $scope.user.info.role = 'employee';
        $scope.passwordSame = false;

        var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        $scope.checkUsername = function () {
            imsFactory.usernameValidate($scope.user.info.username, function (data, status) {
                $scope.emailOk = (data != 'Username duplicated!') && emailRegex.test($scope.user.info.username);

            });
        };
        $scope.checkPassword = function () {
            var pwd1 = $scope.user.info.password || "";
            var pwd2 = $scope.passwordRetype || "";
            var pwdLevel;
            pwdLevel = pwd1.length > 6 ? 1 : 0;
            var re1 = /[0-9]/;
            if (re1.test(pwd1)) {
                pwdLevel += 1;
            }
            var re2 = /[a-z]/;
            if (re2.test(pwd1)) {
                pwdLevel += 1;
            }
            var re3 = /[A-Z]/;
            if (re3.test(pwd1)) {
                pwdLevel += 1;
            }
            $scope.passwordLevel = pwdLevel == 4 ? 'strong' : (pwdLevel == 3 ? 'normal' : 'weak');
            if (pwd1 != "" && pwd2 != "") {
                $scope.passwordSame = pwd1 == pwd2;
            }
        };
        $scope.submitSignUpForm = function (form, username, password) {
            if (!username.$error.required && $scope.emailOk && !password.$error.required && $scope.passwordSame) {
                imsFactory.userSignUp($scope.user, function (data, status) {
                    if (status == 200) {
                        $location.path('#/');
                    }
                });
            }
        };
    }]);