class Lifebuff {
    constructor(bossY) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.X = this.ScreenX * 0.96;
        this.Y = bossY + this.ScreenY * 0.1;
        this.sizeX = this.ScreenX * 0.02;
        this.sizeY = this.ScreenY * 0.04;
    }
    render(state) {
        const context = state.context;
        if(this.Y < (this.ScreenY * 0.78)){
            this.Y += this.ScreenY * 0.01;
        }
        else{
            this.X -= this.ScreenX * 0.004
        }
        context.save();
        context.beginPath();
        context.arc((this.X + this.ScreenX * 0.01), (this.Y + this.ScreenY * 0.02), (this.ScreenY * 0.04), 0, 2 * Math.PI);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
        context.stroke();
        context.restore();
        context.drawImage(state.NinjaImage.Run[0], 170, 0, 185, 215, this.X, this.Y, this.sizeX, this.sizeY);
    }
}
export default Lifebuff;