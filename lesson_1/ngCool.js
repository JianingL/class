/**
 * Created by Jianing on 15-7-21.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    var img=0;
    $scope.changeimg=function(){
        if(img==0){
            $scope.coolimg='cool1.JPG'
            img++;
        }
        else{
            $scope.coolimg='cool2.JPG'
            img--;
        }
    }

});
