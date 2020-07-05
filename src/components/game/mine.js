class Mine {
    constructor() {
        this.trap = 'mine';
        this.X = window.innerWidth;
        this.Y = window.innerHeight * 0.82;
        this.sizeX = window.innerWidth * 0.01;
        this.sizeY = window.innerHeight * 0.02;
        this.distance = window.innerWidth * 0.004;
        this.damage = true;
        this.mine = true;
        this.Arcsize = window.innerWidth * 0.005;
    }
    finishDamge() {
        this.damage = false;
        this.mine = false;
    }
    render(state) {
        this.X -= this.distance;
        var context = state.context;
        if (!this.damage) {
            this.Arcsize += window.innerWidth * 0.01;
            context.save();
            context.beginPath();
            context.arc((this.X + window.innerWidth * 0.005), this.Y, this.Arcsize, 0, 2 * Math.PI);
            context.fillStyle = "#990000";
            context.fill();
            context.closePath();
            context.stroke();
            context.restore();
            if(this.Arcsize > window.innerWidth * 0.05){
                this.X = -101;
            }
        }
        else if (this.mine) {
            context.save();
            context.beginPath();
            context.rect(this.X, this.Y, this.sizeX, this.sizeY);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
            context.beginPath();
            context.rect(this.X - (this.sizeX / 2), this.Y + (this.sizeY / 2), this.sizeX * 2, this.sizeY);
            context.fillStyle = "black";
            context.fill();
            context.closePath();
            context.restore();
        }
    }
}
export default Mine;