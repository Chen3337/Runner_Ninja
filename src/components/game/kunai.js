class Kunai {
    constructor() {
        this.X = 10;
        this.Y = window.innerHeight * 0.75;
        this.sizeX = window.innerWidth * 0.03;
        this.sizeY = window.innerHeight * 0.02;
        this.distance = window.innerWidth * 0.01;
    }
    render(state){
        this.X += this.distance;
        var context = state.context;
        context.drawImage(state.NinjaImage.Kunai[0], this.X, this.Y, this.sizeX, this.sizeY);
    }
}
export default Kunai;