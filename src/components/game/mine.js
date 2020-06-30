class Mine {
    constructor() {
        this.trap = 'mine';
        this.X = window.innerWidth;
        this.Y = window.innerHeight * 0.82;
        this.sizeX = window.innerWidth * 0.01;
        this.sizeY = window.innerHeight * 0.02;
        this.distance = window.innerWidth * 0.005;
    }
    render(state){
        this.X -= this.distance;
        var context = state.context;
        context.save();
        context.beginPath();
        context.rect(this.X, this.Y, this.sizeX, this.sizeY);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
        context.beginPath();
        context.rect(this.X - (this.sizeX /2), this.Y + (this.sizeY /2), this.sizeX * 2, this.sizeY);
        context.fillStyle = "black";
        context.fill();
        context.closePath();
        context.restore();
    }
}
export default Mine;