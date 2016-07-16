/**
 * Created by pengwei on 7/10/16.
 */

//represents 1 hand of cards, e.g.:
// 3 of spade
// 4 of heart, 4 of club
// 2,3,4,5,6
// 5,10,k

function Hand(cards){
    this.cards = cards;
}

Hand.prototype = {
    isSingle : function(){
        return this.cards.length == 1;
    },
    isPair : function(){
        return this.cards.length == 2 && this.cards[0].value == this.cards[1].value;
    },
    isTriple: function(){
        return this.cards.length == 3 && this.cards[0].value == this.cards[1].value &&
            this.cards[1].value == this.cards[2].value ;
    },
    isQuad: function(){
        return this.cards.length == 4 && this.cards[0].value == this.cards[1].value &&
            this.cards[1].value == this.cards[2].value  && this.cards[2].value == this.cards[3].value ;
    }
};