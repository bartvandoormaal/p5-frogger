
class Log extends Rectangle {
    constructor(x,y,w,h,s,c,game) {
        super(x,y,w,h);
        this.padd = 3;
        this.speed = s;
        this.color = c;
        this.game = game;
    }
    
    
    move( x,y ) {
        this.x += x * this.game.gridsize;
        this.y += y * this.game.gridsize;
    }
    
    
    update() {
        this.move(this.speed,0);
        
        if(this.speed > 0 && this.x > width) {
        this.x = -this.w;       
        }
        else if(this.speed < 0 && this.x < -this.w) {
        this.x = width + this.w - this.w; 
        }
        
        
    }
    
    draw() {
        stroke(1);
        fill( this.color );
        rect( this.x+this.padd, this.y+this.padd, this.w-this.padd*2, this.h-this.padd*2 );
        
    }
    
}
