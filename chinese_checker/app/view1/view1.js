'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
      });
    }])
    .factory('Board', [function(){
        function Board(height, width){
            var board = [];
            for(var y=0; y<height; y++){
                var row = [];
                for(var x=0;x<width;x++){
                    row.push(undefined);
                }
                board.push(row);
            }
            this.board = board;
        }
        return Board;
    }])
    .factory('Hole', [function(){
        function Hole(color){
            this.color = color;
            this.piece = undefined;
        }
        Hole.prototype.setPiece = function(piece){
            this.piece = piece;
        };
        Hole.prototype.removePiece = function(){
            this.piece = undefined;
        };
        Hole.prototype.getPiece = function(){
            return this.piece;
        };
        return Hole;
    }])
    .factory('Piece', [function(){
        function Piece(label,x,y){
            this.label = label;
            this.x = x;
            this.y = y;
            this.selected = false;
            this.style = '';
        }
        Piece.prototype.select = function(){
            this.selected = true;
            this.style = 'selected';
        };
        Piece.prototype.unselect = function(){
            this.selected = false;
            this.style = '';
        };
        Piece.prototype.moveTo = function(x,y){
            this.y = y;
            this.x = x;
        };
        return Piece;
    }])
    .controller('View1Ctrl', ['$scope', 'Board', 'Hole', 'Piece', '$timeout', function($scope, Board, Hole, Piece, $timeout) {
        var board = new Board(17, 17).board;
        buildBoard();
        var selectedPiece = null;
        $scope.board = board;
        $scope.select = select;

        function buildBoard(){
            for(var y=0; y<board.length-4; y++){
                for(var x=0;x<y+1;x++){
                    board[y][x+8] = new Hole('lightblue');
                    if(y<4) board[y][x+8].setPiece(new Piece('x', x+8, y));
                }
            }

            for(y=4; y<board.length; y++){
                for(x=board.length-1;x>=y;x--){
                    board[y][x] = new Hole('lightblue');
                    if(y>=13) board[y][x].setPiece(new Piece('o', x, y));
                }
            }
        }
        function select(x, y){
            var piece = board[y][x].getPiece();
            if(piece){
                if(selectedPiece)
                    selectedPiece.unselect();
                piece.select();
                selectedPiece = piece;
            }else if(selectedPiece){
                var path = getValidPath(x, y);

                for(var k=0;k<path.length;k++){
                    $timeout(updateBoard.bind(null, path[k][0], path[k][1]), k*300);
                }
                $timeout(function(){
                    selectedPiece.unselect();
                }, (k-1)*300+10);
            }
            function updateBoard(y,x){
                board[selectedPiece.y][selectedPiece.x].removePiece();
                board[y][x].setPiece(selectedPiece);
                selectedPiece.moveTo(x, y);
            }
        }
        function getValidPath(x, y){
            var sx = selectedPiece.x;
            var sy = selectedPiece.y;
            if(isNeighbor(sx,sy,x,y) || isJump1(sx,sy,x,y)) return [[y,x]];
            return getPath(y,x);
        }
        function isNeighbor(sx,sy,x,y){
            return (x == sx+1 && y == sy) ||
                (x == sx-1 && y == sy) ||
                (x == sx && y == sy+1) ||
                (x == sx && y == sy-1) ||
                (x == sx-1 && y == sy-1) ||
                (x == sx+1 && y == sy+1);
        }
        function isJump1(sx,sy,x,y){
            return (x == sx+2 && y == sy && board[sy][sx+1].getPiece()) ||
                (x == sx-2 && y == sy && board[sy][sx-1].getPiece()) ||
                (x == sx && y == sy+2 && board[sy+1][sx].getPiece()) ||
                (x == sx && y == sy-2 && board[sy-1][sx].getPiece()) ||
                (x == sx-2 && y == sy-2 && board[sy-1][sx-1].getPiece()) ||
                (x == sx+2 && y == sy+2 && board[sy+1][sx+1].getPiece());
        }
        function getPath(targetRow, targetCol){
            var b = angular.copy(board);
            var list = [];
            addNode(selectedPiece.y, selectedPiece.x, null);

            while(list.length>0){
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
                if(isValid(row-2, col)) addNode(row-2, col, coordNode);
                if(isValid(row+2, col)) addNode(row+2, col, coordNode);
                if(isValid(row, col-2)) addNode(row, col-2, coordNode);
                if(isValid(row, col+2)) addNode(row, col+2, coordNode);
                if(isValid(row+2, col+2)) addNode(row+2, col+2, coordNode);
                if(isValid(row-2, col-2)) addNode(row-2, col-2, coordNode);

                function isValid(trow, tcol){
                    var boardHeight = board.length;
                    var boardWidth = board[0].length;
                    return trow >= 0 && trow < boardHeight && tcol>=0 && tcol <boardWidth && b[trow][tcol] && !b[trow][tcol].getPiece() && isJump1(col,row,tcol,trow);
                }

            }
            function addNode(row, col, origin){
                list.push({self: [row, col], origin: origin});
                b[row][col].setPiece(new Piece('x',col,row));
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
