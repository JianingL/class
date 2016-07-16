/**
 * Created by pengwei on 7/10/16.
 */


function Game(opts){
    opts = opts || {};
    this.numPlayers = opts.numPlayers;
    this.startGame();
}

Game.prototype.startGame = function(){
    console.log('game start');
};