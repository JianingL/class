/**
 * Created by Jianing on 15-7-22.
 */
var app = angular.module('tictac', []);
app.controller('GameController', GameController);

function GameController($scope){
    $scope.board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    $scope.currentPlayer = 'x';
    $scope.players = {
        'x': '胖对象',
        'o': '胖胖脸'
    };
    $scope.photo = {
        'x': 'assets/x.jpeg',
        'o': 'assets/o.JPG'
    };

    $scope.reset = function(){
        $scope.board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
    }
    $scope.resetRecord = function () {
        $scope.recordx=0;
        $scope.recordo=0;
    }
    $scope.play = function(row, col){
        if($scope.board[row][col] !=''){
            alert('you cannot put it here')
        }else{
            $scope.board[row][col] = $scope.currentPlayer;
            if(checkVictory()){
                announceWinner();
            }else if(checkDraw()){
                announceDraw();
            }else{
                endTurn();
            }
        }
    };

    function checkVictory(){
        //check rows
        var b = $scope.board;
        for(var k=0;k<3;k++){
            if(b[k][0] == b[k][1] && b[k][1] == b[k][2] && b[k][0] != '') return true;
        }
        for(var k=0;k<3;k++){
            if(b[0][k] == b[1][k] && b[1][k] == b[2][k] && b[0][k] != '') return true;
        }
        if(b[0][0] == b[1][1] && b[1][1] == b[2][2] && b[0][0] != '') return true;
        if(b[0][2] == b[1][1] && b[1][1] == b[2][0] && b[0][2] != '') return true;
        return false;
    }

    $scope.recordx=0;
    $scope.recordo=0;

    function announceWinner(){
        alert('The winner is '+$scope.players[$scope.currentPlayer]);
        if($scope.currentPlayer=='x'){
            $scope.recordx++;
        }else{
            $scope.recordo++;
        }
    }
    function checkDraw(){
        var b = $scope.board;
        var count=0;
        for(var k=0;k<3;k++){
            for (var i=0;i<3;i++){
                if(b[k][i] != '') count ++;
            }
        }
        if(count==9){
            return true;
        }else{
            return false;
        }
    }
    function announceDraw(){
        alert('It is a draw');
    }
    function endTurn(){
        if($scope.currentPlayer == 'x'){
            $scope.currentPlayer = 'o';
        }else{
            $scope.currentPlayer = 'x';
        }
    }
}
