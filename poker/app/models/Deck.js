/**
 * Created by pengwei on 7/10/16.
 */
function Deck(opts){
    this.cards = [];
    this.init(opts.hasJoker, opts.valueInGame);
}

//init the deck, assume there's only one set of cards
Deck.prototype.init = function(hasJoker, valueInGame){
    var self = this;
    _.each(SUITS, function(suit){
        if(suit == SUITS.JOKER) return;
        for(var value = 1; value <= 13; value++){
            self.add(new Card({suit:suit, value:value, valueInGame:valueInGame}));
        }
    });
    if(hasJoker){
        self.add(new Card({suit:SUITS.JOKER, value: 14, valueInGame:valueInGame}));//black joker
        self.add(new Card({suit:SUITS.JOKER, value: 15, valueInGame:valueInGame}));//red joker
    }
    self.shuffle();
};

Deck.prototype.add = function(card){
    this.cards.push(card);
};

Deck.prototype.shuffle = function(){
    this.cards = _.shuffle(this.cards);
};

Deck.prototype.draw = function(){
    if(this.cards.length == 0) return null;
    return this.cards.pop();
};

Deck.prototype.empty = function(){
    return this.cards.length == 0;
};