/**
 * Created by pengwei on 7/10/16.
 */

//represents 1 round of plays

function Round(){
    this.cards = [];
}

Round.prototype.addHand = function(hand){
    this.cards = this.cards.concat(hand.cards);
};

Round.prototype.getScore = function(){
    var score = 0;
    this.cards.forEach(function(card){
        if(card.value == 5) score +=5;
        if(card.value == 10) score +=10;
        if(card.value == 13) score += 10;
    });
    return score;
};