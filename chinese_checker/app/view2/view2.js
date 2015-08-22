'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.hitWall = false;
        var board = makeBoard(10,10);
        var currentCoord = getRandomStart();
        updateBoard(currentCoord);

        function makeBoard(height, width){
            var board = [];
            for(var k=0; k<height; k++){
                var row = [];
                for(var j=0;j<width;j++){
                    if(Math.random()>0.9) row.push('x');
                    else row.push('');
                }
                board.push(row);
            }
            return board;
        }

        function getRandomStart(){
            while(true){
                var y = Math.floor(Math.random()*board.length);
                var x = Math.floor(Math.random()*board[0].length);
                if(board[y][x] == ''){
                    return [y,x];
                }
            }

        }


        function updateBoard(coord){
            currentCoord = coord;
            $scope.board = angular.copy(board);
            $scope.board[coord[0]][coord[1]] = 'o';
            if(board[coord[0]][coord[1]] != ''){
                $scope.hitWall = true;
            }
        }

        $scope.play = function(row, col){
            var path = getPath2(row, col);
            console.log(path);
            for(var k=0;k<path.length;k++){
                $timeout(updateBoard.bind(null, path[k]), k*1000);
            }

        };
/*
        function getPath(row, col){
            var path = [];
            var startRow = currentCoord[0];
            var startCol = currentCoord[1];
            var dy = (row - startRow)/Math.abs(row - startRow);
            var dx = (col - startCol)/Math.abs(col - startCol);

            while(startRow!=row){
                startRow += dy;
                path.push([startRow, startCol]);
            }
            while(startCol!=col){
                startCol += dx;
                path.push([startRow, startCol]);
            }
            return path;
        }
        */
        function getPath2(targetRow, targetCol){
            var b = angular.copy(board);
            var list = [];
            addNode(currentCoord[0], currentCoord[1], null);

            while(list.length>0){
                console.log(list.length);
                var node = list.shift();
                if(node.self[0]==targetRow && node.self[1]==targetCol){
                    return buildPathChain(node);
                }else{
                    addNeighbors(node);
                }
            }
            console.log('no path');
            return [];

            function addNeighbors(coordNode){
                var row = coordNode.self[0];
                var col = coordNode.self[1];
                if(isValid(row-1, col)) addNode(row-1, col, coordNode);
                if(isValid(row+1, col)) addNode(row+1, col, coordNode);
                if(isValid(row, col-1)) addNode(row, col-1, coordNode);
                if(isValid(row, col+1)) addNode(row, col+1, coordNode);

            }
            function addNode(row, col, origin){
                list.push({self: [row, col], origin: origin});
                b[row][col] = 'x';
            }
            function isValid(row, col){
                var boardHeight = board.length;
                var boardWidth = board[0].length;
                return row >= 0 && row < boardHeight && col>=0 && col <boardWidth && b[row][col] == '';
            }
            function buildPathChain(node){
                var path = [];
                while(node.origin){
                    path.unshift(node.self);
                    node = node.origin;
                }
                return path;
            }
        }

}]);