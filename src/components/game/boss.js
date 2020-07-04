class Boss {
    constructor() {
        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;
        this.X = this.ScreenX * 0.94;
        this.Y = this.ScreenY * 0.2;
        this.sprite = {
            startX: 0,
            startY: 0,
            width: 140,
            height: 155,
        };
        this.sizeX = this.ScreenX * 0.06;
        this.sizeY = this.ScreenY * 0.2;
        this.mode = 'move';
        this.direction = 'down';
        this.spriteNumber = 0;
        this.cycle = 1;
    }
    changemode(mode) {
        this.mode = mode;
        this.cycle = 1;
        this.spriteNumber = 0;
    }
    spriteChange() {
        if (this.mode === 'move') {
            if (this.direction === 'down') {
                this.Y += this.ScreenY * 0.005;
                if (this.Y > (this.ScreenY * 0.55)) {
                    this.direction = 'up';
                }
            }
            else if (this.direction === 'up') {
                this.Y -= this.ScreenY * 0.005;
                if (this.Y < (this.ScreenY * 0.2)) {
                    this.direction = 'down';
                }
            }
            this.sprite = {
                startX: 0,
                startY: 0,
                width: 140,
                height: 155,
            };
        }
        else if (this.mode === 'attack') {
            if (this.spriteNumber === 0) {
                this.sprite = { startX: 0, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 1) {
                this.sprite = { startX: 175, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 2) {
                this.sprite = { startX: 345, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 3) {
                this.sprite = { startX: 520, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 4) {
                this.sprite = { startX: 700, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 5) {
                this.sprite = { startX: 880, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 6) {
                this.sprite = { startX: 1060, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 7) {
                this.sprite = { startX: 1230, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 8) {
                this.sprite = { startX: 1400, startY: 510, width: 160, height: 155 };
            }
            else if (this.spriteNumber === 9) {
                this.sprite = { startX: 1580, startY: 310, width: 110, height: 65 };
            }
            if (this.cycle % 12 === 0) {
                this.spriteNumber += 1;
            }
            if (this.spriteNumber > 9) {
                this.mode = 'move';
            }
        }
    }
    render(state) {
        this.spriteChange();
        this.cycle += 1;
        const context = state.context;
        // drawimage(image, image startx, starty, widthsize, heightsize
        // , canvas x location, canvas y location, canvas image size x, canvas image size y)
        // if(this.attacked){
        //     context.drawImage(state.monsterthreeImage, this.attsprite.startX, this.attsprite.startY, this.attsprite.width, this.attsprite.height, 0 - this.sizeX, (0 - this.sizeY), this.sizeX, this.sizeY);
        // }
        context.drawImage(state.NinjaImage.Boss[0], this.sprite.startX, this.sprite.startY, this.sprite.width, this.sprite.height, this.X, this.Y, this.sizeX, this.sizeY);
    }
}
export default Boss;