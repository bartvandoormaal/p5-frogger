class Rectangle {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    intersects( other ) {
        let l = this.x + this.padd;
        let r = this.x + this.w - this.padd*2;
        let t = this.y + other.padd;
        let b = this.y + this.h - other.padd*2;
        
        let ol = other.x + other.padd;
        let or = other.x + other.w - other.padd*2;
        let ot = other.y + other.padd;
        let ob = other.y + other.h - other.padd*2;
        
        //If not in the same lane, no intersection
        if( ( ot >= b ) ) {
            return false;
        }
        
        return !(
            l >= or ||
            r <= ol ||
            t >= ob ||
            b <= ot
        );
        
    }

}
