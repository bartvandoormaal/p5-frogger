
class Lane {
    constructor( l, c, game ) {
        this.game = game;
        this.y = l * this.game.gridsize;   
        this.color = c;
        this.padd = 0;
        
    }
    
    draw() {
        noStroke();
        fill( this.color );
        rect( 0, this.y, width, this.game.gridsize );  
    }
}
