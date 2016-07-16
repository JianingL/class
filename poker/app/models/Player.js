/**
 * Created by pengwei on 7/10/16.
 */

function Player(name){
    this.name = name;
    this.cards = [];
    this.score = 0;
}

Player.prototype.getCards = function(){
    return this.cards;
};

Player.prototype.addCard = function(card){
    this.cards.push(card);
};

Player.prototype.playHand = function(hand){
    this.cards = _.difference(this.cards, hand.cards);
};

Player.prototype.addScore = function(score){
    this.score += score;
};

Player.prototype.sortCards = function(){
    this.cards = _.sortBy(this.cards, function(card){
        return card.valueInGame;
    })
};