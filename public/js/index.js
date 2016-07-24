/**
 * Created by Ganesh on 6/19/2016.
 */
var app1=angular.module('app1',[]);
var app2=angular.module('app2',[]);


app1.controller('cntrl1',function($scope,$http,$window){
    console.log('I am in index page');
    //$http.get('/signin');

    $scope.signin= function () {
        $http.post('/signin',$scope.emp).success(function(response){


            if(response.message === 'success'){

                $window.location.href='./ibm_homepage.html';
            }
            else{
                $scope.message="username/password is wrong";

            }
        });
    }
});

app2.controller('cntrl1',function($scope,$http,$window){

    $scope.limitKeypress = function ($event, value,maxLength) {
        if (value != undefined && value.toString().length >= maxLength) {
            $event.preventDefault();
        }
    }

    $scope.register=function(){
        if($scope.user.passwd === $scope.user.confirm_password){
            //console.log('password matched');
            //console.log($scope.user.passwd);
            //console.log($scope.user.confirm_password);
            $scope.error_msg=""

            $http.post('/registerdata',$scope.user).success(function (response) {
                //console.log(response);
                if(response.message === 'success'){
                    $window.location.href='./ibm_homepage.html';
                }
                else if(response.message === 'fail'){
                    alert('you have entered wrong emp id or email id');
                }
                else{
                    alert('user is already registered with empid/email');
                }
            });
        }
        else{
            console.log('password not matched');
            $scope.error_msg='password does not match';
        }

    }
});