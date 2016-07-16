/**
 * Created by pengwei on 7/10/16.
 */

function Game_7w523(){
    Game.call(this, {
        numPlayers: 2
    });
}

Game_7w523.prototype = Object.create(Game.prototype);
Game_7w523.prototype.constructor = Game_7w523;
Game_7w523.prototype.startGame = function(){
    this.deck = new Deck({
        hasJoker: true,
        valueInGame: function(value){
            var values = [8,10,9,0,11,1,13,2,3,4,5,6,7,12,12];
            return values[value - 1];
        }
    });
    this.players = [];
    this.players.push(new Player('brian'));
    this.players.push(new Player('esther'));
    this.drawCards(this.players[0], true);
    this.drawCards(this.players[1]);
    this.currentPlayerIndex = 0;
    this.lastHand = undefined;
    this.currentRound = new Round();
    this.discardedCards = [];
    //game is setup, wait for currentPlayer to play a hand
};

Game_7w523.prototype.getCurrentPlayer = function(){
    return this.players[this.currentPlayerIndex];
};

Game_7w523.prototype.drawCards = function(player, initialDraw){
    var numCards = initialDraw ? 6 : 5;
    while(player.cards.length < numCards && !this.deck.empty()){
        player.addCard(this.deck.draw());
    }
    player.sortCards();
};

Game_7w523.prototype.isHandValid = function(hand){
    if(!this.lastHand){
        return hand.isSingle() || hand.isPair() || hand.isTriple() || hand.isQuad();
    }else{
        if(this.lastHand.isSingle()){
            return hand.isSingle() && Game_7w523.compareCard(hand.cards[0], this.lastHand.cards[0]) >= 0;
        }else if(this.lastHand.isPair()){
            return hand.isPair() && Game_7w523.compareCard(hand.cards[0], this.lastHand.cards[0]) >= 0;
        }else if(this.lastHand.isTriple()){
            return hand.isTriple() && Game_7w523.compareCard(hand.cards[0], this.lastHand.cards[0]) >= 0;
        }else if(this.lastHand.isQuad()){
            return hand.isQuad() && Game_7w523.compareCard(hand.cards[0], this.lastHand.cards[0]) >= 0;
        }else{
            throw new Error('Last hand is not valid!');
        }
    }
};

Game_7w523.prototype.playHand = function(hand){
    this.getCurrentPlayer().playHand(hand);
    this.currentRound.addHand(hand);
    this.discardedCards = this.discardedCards.concat(hand.cards);
    this.lastHand = hand;
    this.nextTurn();
};

Game_7w523.prototype.pass = function(){
    this.lastHand = null;
    this.nextTurn();
    this.getCurrentPlayer().addScore(this.currentRound.getScore());
    this.drawCards(this.players[0]);
    this.drawCards(this.players[1]);
    this.currentRound = new Round();
};

Game_7w523.prototype.isOver = function(){
    var somePlayerHasNoCard = _.some(this.players, function(player){
        return player.getCards().length == 0;
    });
    var deckIsEmpty = this.deck.empty();
    return somePlayerHasNoCard && deckIsEmpty;
};

Game_7w523.prototype.getWinner = function(){
    if(!this.isOver()) return null;
    else{
        return _.max(this.players, function(player){
            return player.score;
        })
    }
};

Game_7w523.prototype.nextTurn = function(){
    this.currentPlayerIndex++;
    this.currentPlayerIndex = this.currentPlayerIndex % this.numPlayers;
};

Game_7w523.compareCard = function(card1, card2){
    var value1 = card1.valueInGame;
    var value2 = card2.valueInGame;
    if(value1 > value2) return 1;
    else if(value1 == value2) return 0;
    else return -1;
};

