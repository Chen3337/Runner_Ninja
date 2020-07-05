class Wall {
    constructor() {
        this.trap = 'wall';
        this.X = window.innerWidth;
        this.Y = window.innerHeight * 0.75;
        this.sizeX = window.innerWidth * 0.02;
        this.sizeY = window.innerHeight * 0.1;
        this.distance = window.innerWidth * 0.004;
        this.damage = true;
    }
    finishDamge(){
        this.damage = false;
        this.sizeY = this.sizeY /2;
        this.Y += this.sizeY;
    }
    render(state){
        this.X -= this.distance;
        var context = state.context;
        context.fillRect(this.X, this.Y, this.sizeX, this.sizeY);
    }
}
export default Wall;