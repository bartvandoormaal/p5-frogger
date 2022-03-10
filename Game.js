const GAME_STATE_TITLE = 0;
const GAME_STATE_PLAY = 1;
const GAME_STATE_PAUSE = 2;
const GAME_STATE_GAMEOVER = 3;


class Game {
    constructor() {
        //Current game state
        this.gameState = GAME_STATE_PLAY;

        //Lives left
        this.lives = 0;

        //Time in current level
        this.time = 0;

        //Frogs in save spaces
        this.frogInSave1 = false;
        this.frogInSave2 = false;
        this.frogInSave3 = false;
        this.frogInSave4 = false;
        this.frogInSave5 = false;

        //Gridsize
        this.gridsize = 40;

        //The frog / character
        this.frog;

        //Start at level 1
        this.level = 1;
                
        //Cars, logs and turles in current level
        this.cars = [];
        this.logs = [];
        this.turtles = [];

        //Timer for text display
        this.textTimer = 0;
    }


    startNewGame() {
        this.frog = {};
        this.frog = new Frog( this.gridsize * 7 , this.height - this.gridsize * 2, this.gridsize, this.gridsize, this);
        this.lives = 6;
        this.time = 300;
        this.frog.gotoBottom();
        this.frog.attach(null);
        this.frogInSave1 = false;
        this.frogInSave2 = false;
        this.frogInSave3 = false;
        this.frogInSave4 = false;
        this.frogInSave5 = false;
            
        this.gameState = GAME_STATE_PLAY;
    }

    nextLevel() {
        if( this.lives < 6 ) this.lives++;
        this.time = 300;
        this.frog.gotoBottom();
        this.frog.attach(null);
        this.frogInSave1 = false;
        this.frogInSave2 = false;
        this.frogInSave3 = false;
        this.frogInSave4 = false;
        this.frogInSave5 = false;
            
        this.level+=10;

        this.createLevel();

        this.gameState = GAME_STATE_PLAY;
    }


    createLevel() {
        this.cars = [];
        this.logs = [];
        this.turtles = [];

        this.lane1 = new Lane( 2, [0,0,180], this );
        this.lane2 = new Lane( 3, [0,0,140], this );
        this.lane3 = new Lane( 4, [0,0,180], this );
        this.lane4 = new Lane( 5, [0,0,140], this );
        this.lane5 = new Lane( 6, [0,0,180], this );
        
        this.lane6 = new Lane( 8, [80], this );
        this.lane7 = new Lane( 9, [70], this );
        this.lane8 = new Lane( 10, [80], this );
        this.lane9 = new Lane( 11, [70], this );
        this.lane10 = new Lane( 12, [80], this );
        
        //All cars are the same height and only that last row has a different width
        let h = this.gridsize;
        let w = this.gridsize * 1.5;
        
        //BOTTOM ROW CARS, SLOWEST
        let speed = map( this.level, 1, 100, 1, 10);
        let startPos = 2;
        let inc = 5;
        let y = 12 * this.gridsize;
        for( let i = 0 ; i < 3 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.cars.push( new Car(x, y, this.gridsize*1.5, h, -0.01 * speed, [150,150,0], this ) );
        }
        
        //1 UP FROM BOTTOM, A BIT FASTER
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 4;
        y = 11 * this.gridsize;
        for( let i = 0 ; i < 4 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.cars.push( new Car(x, y, w, h, 0.015 * speed, [0,150,0], this ) );
        }
        
        //NEXT ROW UP, AGAIN, A BIT FASTER
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 3;
        y = 10 * this.gridsize;
        for( let i = 0 ; i < 4 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.cars.push( new Car(x, y, w, h, -0.025 * speed, [150,0,150], this ) );
        }
        
        //NEXT ROW UP, AGAIN, A BIT FASTER
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 3;
        y = 9 * this.gridsize;
        for( let i = 0 ; i < 1 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.cars.push( new Car(x, y, w, h, 0.035 * speed, [150,150,150], this ) );
        }
        
        //NEXT ROW UP, AGAIN, A BIT FASTER
        w = this.gridsize * 2;
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 5;
        y = 8 * this.gridsize;
        for( let i = 0 ; i < 2 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.cars.push( new Car(x, y, w, h, -0.025 * speed, [100,150,150], this ) );
        }
        
        //FIRST ROW RIVER (TURTLES)
        w = this.gridsize;
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 5;
        y = 6 * this.gridsize;
        for( let i = 0 ; i < 3 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.turtles.push( new Turtle(x,            y, w, h, -0.025 * speed, [150, 50, 50], this ) );
            this.turtles.push( new Turtle(x+this.gridsize,   y, w, h, -0.025 * speed, [150, 50, 50], this ) );
            this.turtles.push( new Turtle(x+this.gridsize*2, y, w, h, -0.025 * speed, [150, 50, 50], this ) );
            
        }
        
        //NEXT RIVER ROW ARE LOGS
        w = this.gridsize * 2;
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 6;
        y = 5 * this.gridsize;
        for( let i = 0 ; i < 3 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.logs.push( new Log(x, y, w, h, 0.01 * speed, [100, 50, 50], this ) );
        }
        
        //LOGS AGAIN
        w = this.gridsize * 5;
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 8;
        y = 4 * this.gridsize;
        for( let i = 0 ; i < 2 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.logs.push( new Log(x, y, w, h, 0.025 * speed, [100, 50, 50], this ) );
        }
        
        //THEN TURTLES 
        w = this.gridsize;
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 4;
        y = 3 * this.gridsize;
        for( let i = 0 ; i < 4 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.turtles.push( new Turtle(x,            y, w, h, -0.025 * speed, [150, 50, 50], this ) );
            this.turtles.push( new Turtle(x+this.gridsize,   y, w, h, -0.025 * speed, [150, 50, 50], this ) );
            
        }
        
        //AND FINALLY LOGS
        w = this.gridsize * 3;
        speed = map( this.level, 1, 100, 1, 10);
        startPos = 1;
        inc = 6;
        y = 2 * this.gridsize;
        for( let i = 0 ; i < 3 ; i++) {
            let x = this.gridsize * (startPos + (i*inc));
            this.logs.push( new Log(x, y, w, h, 0.02 * speed, [100, 50, 50], this ) );
        }
    }

    handleKeyRelease() {
        if( this.gameState == GAME_STATE_TITLE ) {
            if (keyCode === RETURN) {
                this.gameState = GAME_STATE_PLAY;
            }
        }
        
        else if( this.gameState == GAME_STATE_PLAY ) {

            if (keyCode === LEFT_ARROW) {
                this.frog.moveP(-1,0);
                this.frog.attach( null );
            }  
            else if (keyCode === RIGHT_ARROW) {
                this.frog.moveP(1,0);     
                this.frog.attach( null );
            }
            else if (keyCode === UP_ARROW) {
                this.frog.moveP(0,-1);
                this.frog.attach( null );
            }
            else if (keyCode === DOWN_ARROW) {
                this.frog.moveP(0,1);     
                this.frog.attach( null );
            }
        }
        
        else if( this.gameState == GAME_STATE_GAMEOVER ) {
            if (keyCode === RETURN) {
                this.startNewGame();
            }
        }
    }

    update() {
        if( this.textTimer > 0 ) this.textTimer--;

        if( this.gameState == GAME_STATE_PLAY ) {
                
            let inLane = this.frog.inLane();      
            
            //Check for car collision
            if( inLane == 12 || inLane == 11 || inLane == 10 || inLane == 9  || inLane == 8  ){
                for( let i = 0 ; i < this.cars.length ; i++ ){ 
                    if( this.cars[i].intersects( this.frog ) ) {
                        if( !this.frog.isDead) this.lives--;
                        if( this.lives == 0 ) {
                            this.gameState = GAME_STATE_GAMEOVER;
                        }
                        else if( !this.frog.isDead)  {
                            this.frog.dies();                
                        }
                    }
                }
            }
            
            //Check for log collision
            if( inLane == 6 || inLane == 5 || inLane == 4 || inLane == 3  || inLane == 2  ){
                this.frog.attach( null );
                
                for( let i = 0 ; i < this.logs.length ; i++ ){   
                    if( this.logs[i].intersects(this.frog) && this.frog.attached == null ) {
                        this.frog.attach( this.logs[i] );
                    }
                }
                
                for( let i = 0 ; i < this.turtles.length ; i++ ){   
                    if( this.turtles[i].intersects(this.frog)  ) {
                        if( !this.turtles[i].isUnderWater() ) {
                            this.frog.attach( this.turtles[i] );
                        }
                        
                        
                    }
                }
                
                if( this.frog.attached == null ) { 
                    if( !this.frog.isDead) this.lives--;
                        if( this.lives == 0 ) {
                            this.gameState = GAME_STATE_GAMEOVER;
                        }
                    else  if( !this.frog.isDead) {
                        this.frog.dies();
                    }
                }
                
            }
            
            
            
        }
    }

    drawLevel() {

        //Grass top
        noStroke();

        fill(0,100,0);
        rect(0,0,width,this.gridsize*2);

        //Water targets top
        fill(0,0,140);
        rect(this.gridsize*0.75,  this.gridsize*0.5,this.gridsize*1.5,this.gridsize*1.5);
        rect(this.gridsize*3.75,  this.gridsize*0.5,this.gridsize*1.5,this.gridsize*1.5);
        rect(this.gridsize*6.75,  this.gridsize*0.5,this.gridsize*1.5,this.gridsize*1.5);
        rect(this.gridsize*9.75,  this.gridsize*0.5,this.gridsize*1.5,this.gridsize*1.5);
        rect(this.gridsize*12.75, this.gridsize*0.5,this.gridsize*1.5,this.gridsize*1.5);

        //savezone middle
        fill(0,100,0);
        rect(0,this.gridsize*7,width,this.gridsize);

        //savezone bottom
        fill(0,100,0);
        rect(0,this.gridsize*13,width,this.gridsize);
        
        //black bottom
        fill(0);
        rect(0,this.gridsize*14,width,this.gridsize);


        
        this.lane1.draw();
        this.lane2.draw();
        this.lane3.draw();
        this.lane4.draw();
        this.lane5.draw();
        this.lane6.draw();
        this.lane7.draw();
        this.lane8.draw();
        this.lane9.draw();
        this.lane10.draw();

        for( let i = 0 ; i < this.cars.length ; i++ ){ 
            if( this.gameState == GAME_STATE_PLAY ) {
                if( !this.frog.isDead) this.cars[i].update();
            }
            this.cars[i].draw();  
        }
        
        for( let i = 0 ; i < this.logs.length ; i++ ){ 
            if( this.gameState == GAME_STATE_PLAY ) {
                if( !this.frog.isDead) this.logs[i].update();
            }
            this.logs[i].draw();  
        }
        for( let i = 0 ; i < this.turtles.length ; i++ ){ 
            if( this.gameState == GAME_STATE_PLAY ) {
                if( !this.frog.isDead) this.turtles[i].update();
            }
            this.turtles[i].draw();  
        }
    }

    drawSaveFrogs() {
        
        if( this.frogInSave1 ) {
            fill( this.frog.color );
            let x = this.gridsize * 0.75;
            let y = this.gridsize * 0.5;
            rect( x + this.frog.w/2 - this.frog.padd*2, (y + this.frog.h/2 - this.frog.padd*2),this.frog.w - this.frog.padd*2, this.frog.h - this.frog.padd*2 );      
        }
        
        if( this.frogInSave2 ) {
            fill( this.frog.color );
            let x = this.gridsize * 3.75;
            let y = this.gridsize * 0.5;
            rect( x + this.frog.w/2 - this.frog.padd*2, (y + this.frog.h/2 - this.frog.padd*2),this.frog.w - this.frog.padd*2, this.frog.h - this.frog.padd*2 );      
        }
        
        if( this.frogInSave3 ) {
            fill( this.frog.color );
            let x = this.gridsize * 6.75;
            let y = this.gridsize * 0.5;
            rect( x + this.frog.w/2 - this.frog.padd*2, (y + this.frog.h/2 - this.frog.padd*2),this.frog.w - this.frog.padd*2, this.frog.h - this.frog.padd*2 );      
        }
        
        if( this.frogInSave4 ) {
            fill( this.frog.color );
            let x = this.gridsize * 9.75;
            let y = this.gridsize * 0.5;
            rect( x + this.frog.w/2 - this.frog.padd*2, (y + this.frog.h/2 - this.frog.padd*2),this.frog.w - this.frog.padd*2, this.frog.h - this.frog.padd*2 );      
        }
        
        if( this.frogInSave5 ) {
            fill( this.frog.color );
            let x = this.gridsize * 12.75;
            let y = this.gridsize * 0.5;
            rect( x + this.frog.w/2 - this.frog.padd*2, (y + this.frog.h/2 - this.frog.padd*2),this.frog.w - this.frog.padd*2, this.frog.h - this.frog.padd*2 );      
        }
        
        
        if( this.frogInSave1 || this.frogInSave2 || this.frogInSave3 || this.frogInSave4 || this.frogInSave5 ) {
            if( this.textTimer > 0 ) {
                noStroke();
                textFont("monospace");
                fill(255);
                textSize(78);    
                text("NEXT LEVEL!", 90, 200);
            }
            else { 
                setTimeout( ()=> this.nextLevel(), 1200 );
                this.textTimer = 120;
            }
        }
        
    }
}