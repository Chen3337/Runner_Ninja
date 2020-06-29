class Wall {
    constructor() {
        this.X = window.innerWidth - 100;
        this.Y = window.innerHeight * 0.7;
        this.sizeX = window.innerWidth * 0.02;
        this.sizeY = window.innerHeight * 0.15;
        this.distance = window.innerWidth * 0.005;
    }
    render(state){
        this.X -= this.distance;
        var context = state.context;
        context.fillRect(this.X, this.Y, this.sizeX, this.sizeY);
    }
}
export default Wall;