class BossAttack {
    constructor(bossY, charaterY) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.X = this.ScreenX * 0.94;
        this.Y = bossY + this.ScreenY * 0.12;
        this.sizeX = this.ScreenX * 0.03;
        this.sizeY = this.ScreenY * 0.05;
    }
    render(state) {
        this.cycle += 1;
        if (this.cycle > 40) {
            this.X -= this.distanceX;
            this.Y -= this.distanceY;
        }
        const context = state.context;
        context.drawImage(state.NinjaImage.Boss[0], this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, this.X, this.Y, this.sizeX, this.sizeY);
    }
}
export default BossAttack;