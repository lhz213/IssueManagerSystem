/**
 * Created by LHZ on 2015/4/16.
 */
var moduleName = "issuesManagerSystem.angularUtils.Factory";

angular.module(moduleName, [])
    .factory('imsFactory', ['$http', function ($http) {
        var baseUrl = window.location.origin;
        var userBaseUrl = baseUrl + "/users";
        var userValidationUrl = userBaseUrl + "?username=";
        return {
            usernameValidate: function (username, callback) {
                $http({
                    method: 'GET',
                    url: userValidationUrl + username
                }).success(callback);
            },
            userSignUp: function (user, callback) {
                $http({
                    method: 'POST',
                    url: userBaseUrl,
                    data: user
                }).success(callback);
            },
            userSignIn: function (user, callback) {
                $http({
                    method: 'POST',
                    url: userBaseUrl,
                    data: user
                }).success(callback);
            }
        }
    }])
    .controller('SignUpCtrl', ['$scope', function ($scope) {

    }]);