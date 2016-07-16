'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    var game = new Game_7w523();
    $scope.game = game;
    $scope.selectedCards = [];

    $scope.play = function(){
        var hand = makeHand();
        if(game.isHandValid(hand)){
            game.playHand(hand);
            $scope.selectedCards = [];
            if(game.isOver()){
                announceWinner(game.getWinner());
            }
        }else{
            alert('Hand is not valid!');
        }
    };
    $scope.pass = function(){
        $scope.selectedCards = [];
        game.pass();
    };

    function makeHand(){
        var cardsInHand = [];
        var cards = game.getCurrentPlayer().getCards();
        for(var k = 0; k < cards.length; k++){
            if($scope.selectedCards[k]) cardsInHand.push(cards[k]);
        }
        return new Hand(cardsInHand);
    }

    function announceWinner(winner){
        alert('winner is ' + winner.name);
    }
}]);