
class Turtle extends Rectangle {
    constructor(x,y,w,h,s,c,game) {  
        super(x,y,w,h);
        
        this.tick = 0;
        this.padd = 3;
        this.pp = this.padd;
        this.speed = s;
        this.color = c;
        this.color = [10,70,10];
        this.UnderWaterPadd = 11;
        this.sizeCnt = random( 300, 800 );
        this.game = game;
        
    }
    
    move( x,y ) {
        this.x += x * this.game.gridsize;
        this.y += y * this.game.gridsize;
    }
    
    
    update() {
        this.tick++;        
        let m = ( this.tick % this.sizeCnt);
        
        this.color = [10,70,10];
        
        if( m > ((this.sizeCnt/4) * 1) && m < ((this.sizeCnt/4) * 2) && this.padd < this.UnderWaterPadd ) { 
            this.padd++;
        }
        if( m > ((this.sizeCnt/4) * 3) && this.padd > this.pp ) { 
            this.padd--;
        }
        if( this.padd == this.UnderWaterPadd ) {
            this.color = [50,50,150];
        }
        
        this.move(this.speed,0);
        
        if(this.speed > 0 && this.x > width) {
            this.x = -this.w;       
        }
        else if(this.speed < 0 && this.x < -this.w) {
            this.x = width + this.w - this.w; 
        }
        
        
    }
    
    isUnderWater() {
        return this.padd == this.UnderWaterPadd;  
    }
    
    draw() {
        stroke(1);
        fill( this.color );
        rect( this.x+this.padd, this.y+this.padd, this.w-this.padd*2, this.h-this.padd*2 );
        
    }

}
