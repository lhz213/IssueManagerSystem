/**
 * Created by LHZ on 2015/4/16.
 */

angular.module('issueManagerSystem', ['ngRoute', 'ui.bootstrap', 'ims.Utils', 'template/modal/imsSignIn.html'])
    .config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '../views/Main.html',
                controller: 'IndexPageCtrl'
            }).
            when('/signUp', {
                templateUrl: '../views/signUp.html',
                controller: 'SignUpCtrl'
            }).
            when('/ask', {
                templateUrl: '../views/AdminDashboard.html',
                controller: 'AdminCtrl'
            }).
            when('/question/:questionId', {
                templateUrl: '../views/AnswerQuestion.html',
                controller: 'AnswerQuestionCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    })
    .directive('goToTop', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                angular.element($window).bind("scroll", function () {
                    scope.visible = this.pageYOffset >= 70;
                    scope.$apply();
                });
                element.on('click', function () {
                    $('body, html').stop(true, true).animate({scrollTop: $("#topPosition").offset().top}, "slow");
                });
            }
        }
    })
    .controller('ShellPageCtrl', ['$scope', '$location', '$modal', function ($scope, $location, $modal) {
        $scope.status = {
            isopen: false
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.showSignInForm = function () {
            var modalInstance = $modal.open({
                templateUrl: 'template/modal/imsSignIn.html',
                controller: 'SignInModalCtrl'
            });

            modalInstance.result.then(function (user) {
                $scope.user = user;
                console.log($scope.user.fristName);
                $scope.user.name = $scope.user.fristName?$scope.user.fristName:$scope.user.username;
            });
        };
    }])
    .controller('SignInModalCtrl', ['$scope', '$modalInstance', 'imsFactory', function ($scope, $modalInstance, imsFactory) {
        $scope.user = {};
        $scope.user.action = 'userSignIn';
        $scope.user.info = {};
        $scope.user.info.username = '';
        $scope.user.info.password = '';
        $scope.signIn = function (email, password) {
            if (!email.$error.required && !password.$error.required) {
                imsFactory.userSignIn($scope.user, function (data, status) {
                    $modalInstance.close(data);
                });
            }
        };
        $scope.close = function () {
            $modalInstance.dismiss('close');
        };
        $scope.resetSignInForm = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.question = {};
        };
        $scope.resetSignInForm();

    }]);


angular.module("template/modal/imsSignIn.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/modal/imsSignIn.html",
        "<form name='signInForm' novalidate> \n" +
        "   <div class='modal-header'> \n" +
        "       <h3 class='modal-title'>Sign In\n" +
        "           <small>Don't have an account? <a href='#/signUp' ng-click='close()'>SignUp</a> now.</small> \n" +
        "       </h3> \n" +
        "   </div> \n" +
        "   <div class='modal-body'> \n" +
        "       <div class='form-group'> \n" +
        "           <div class='col-xs-6 pull-right ng-show='signInForm.$submitted || signInForm.email.$touched'> \n" +
        "               <div class='label label-danger' ng-show='signInForm.email.$error.required'> \n" +
        "                   Email cannot empty \n" +
        "               </div> \n" +
        "           </div> \n" +
        "           <label for='signInEmailAddress1'>Email address</label> \n" +
        "           <input type='email' class='form-control' id='email' name='email' placeholder='Enter email' ng-model='user.info.username' required='required'> \n" +
        "       </div> \n" +
        "       <div class='form-group'> \n" +
        "           <div class='col-xs-6 pull-right ng-show='signInForm.$submitted || signInForm.password.$touched'> \n" +
        "               <div class='label label-danger' ng-show='signInForm.password.$error.required'> \n" +
        "                   Password cannot be empty \n" +
        "               </div> \n" +
        "           </div> \n" +
        "           <label for='signInPassword1'>Password</label> \n" +
        "           <input type='password' class='form-control' id='password' name='password' placeholder='Password' ng-model='user.info.password' required='required'> \n" +
        "       </div> \n" +
        "       <div class='checkbox'> \n" +
        "           <label> \n" +
        "               <input type='checkbox' ng-model='rememberMe'> Remember Me\n" +
        "           </label> \n" +
        "       </div> \n" +
        "   </div> \n" +
        "   <div class='modal-footer'> \n" +
        "       <button type='submit' class='btn btn-default' ng-click='signIn(signInForm.email ,signInForm.password)'>SignIn</button> \n" +
        "       <button class='btn btn-warning' ng-click='close()'>Cancel</button> \n" +
        "   </div> \n" +
        "</form> \n"
    );
}]);