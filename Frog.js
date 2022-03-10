
class Frog extends Rectangle {
    constructor(x,y,w,h,game) {  
        super(x,y,w,h);
        this.padd = 3;
        this.attached = null
        this.color = [0,150,0];
        this.isDead = false;
        this.game = game;
    }
    
    
    attach( frog ) {
        this.attached = frog;  
    }
    
    inLane() {
        return parseInt(( this.y / this.game.gridsize) );    
    }
        
    dies() {
        this.isDead = true;
        this.color = [150,20,20];
        setTimeout( () => { this.revive() }, 2000 );
    }
    revive() {
        this.color = [0,150,0];
        this.isDead = false;
        this.gotoBottom();
        this.attach(null);
    }
    
    
    update() {
        if( this.attached != null ) { 
        this.move(this.attached.speed,0); 
        }
    }
    
    gotoBottom() {
        this.x = this.game.gridsize*7
        this.y = height-this.game.gridsize*2
        
    }
    moveP(x,y){
        if( this.isDead ) return;
        
        this.move(x,0);
        
        if(this.inLane() == 2) {
            if( this.x > this.game.gridsize*0.75 && this.x < (this.game.gridsize*0.75) + (this.game.gridsize*1.5) ) {
                this.move(0,y);
                this.game.frogInSave1 = true;
                this.gotoBottom();
            }
            else if( this.x > this.game.gridsize*3.75 && this.x < (this.game.gridsize*3.75) + (this.game.gridsize*1.5) ) {
                this.move(0,y);
                this.game.frogInSave2 = true;
                this.gotoBottom();
            }
            else if( this.x > this.game.gridsize*6.75 && this.x < (this.game.gridsize*6.75) + (this.game.gridsize*1.5) ) {
                this.move(0,y);
                this.game.frogInSave3 = true;
                this.gotoBottom();
            }
            else if( this.x > this.game.gridsize*9.75 && this.x < (this.game.gridsize*9.75) + (this.game.gridsize*1.5) ) {
                this.move(0,y);
                this.game.frogInSave4 = true;
                this.gotoBottom();
            }
            else if( this.x > this.game.gridsize*12.75 && this.x < (this.game.gridsize*12.75) + (this.game.gridsize*1.5) ) {
                this.move(0,y);
                this.game.frogInSave5 = true;
                this.gotoBottom();
            }
        }
        else {
            this.move(0,y);
        }
        
        
    }
    
    move( x,y ) {
        this.x += x * this.game.gridsize;
        if(this.x < 0 ) {
            this.x = 0;
        }
        if(this.x > width - this.w ) {
            this.x = width - this.w;
        }
        
        this.y += y * this.game.gridsize;
        if(this.y < 0 ) {
            this.y = 0;
        }
        if(this.y > height - this.h ) {
            this.y = height - this.h;
        }
    }
    
    draw() {
        stroke(1);
        fill( this.color );
        rect( this.x+this.padd, this.y+this.padd, this.w-this.padd*2, this.h-this.padd*2 );
    }
}
