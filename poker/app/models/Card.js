/**
 * Created by pengwei on 7/10/16.
 */

//represents 1 card

function Card(opts){
    this.suit = opts.suit;
    this.value = opts.value;
    if(opts.valueInGame){
        this.valueInGame = opts.valueInGame(opts.value);
    }
    this.imageName = this.getImageName();
}

Card.prototype.isJoker = function(){
    return this.value == 14 || this.value == 15;
};

Card.prototype.getImageName = function(){
    if(this.value == 14) return 'black_joker';
    if(this.value == 15) return 'red_joker';

    return VALUE_TO_IMG_NAME[this.value] + '_of_' + SUIT_TO_IMG_NAME[this.suit];
};