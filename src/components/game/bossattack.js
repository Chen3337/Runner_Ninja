class BossAttack {
    constructor(bossY, charaterY) {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.X = this.ScreenX * 0.94;
        this.Y = bossY + this.ScreenY * 0.12;
        this.attsprite = { startX: 0, startY: 710, width: 140, height: 100 };
        this.sizeX = this.ScreenX * 0.03;
        this.sizeY = this.ScreenY * 0.05;
        this.spriteNumber = 0;
        this.distanceX = this.ScreenX * 0.005;
        this.distanceY = (this.Y - (charaterY + this.ScreenY * 0.05)) / 188;
        this.cycle = 0;
    }
    spriteChange() {
        if (this.spriteNumber === 0) {
            this.attsprite = { startX: 0, startY: 710, width: 140, height: 100 };
        }
        else if (this.spriteNumber === 1) {
            this.attsprite = { startX: 110, startY: 720, width: 140, height: 100 };
        }
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