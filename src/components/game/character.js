class Character {
    constructor() {
        this.character = 'ninja';
        this.mode = "run";
        this.cycle = 0;
        this.spriteOn = 0;
        this.X = 10;
        this.Y = window.innerHeight * 0.7;
        this.sizeX = window.innerWidth * 0.06;
        this.sizeY = window.innerHeight * 0.15;
    }
    charMode(newMode){
        this.mode = newMode;
        this.cycle = 0;
        this.spriteOn = 0;
    }
    render(state) {
        var context = state.context;
        var images = state.NinjaImage;
        if(this.mode === 'idle'){
            this.spriteOn = 0;
            images = images.Idle[this.spriteOn];
        }
        else if (this.mode === 'jump'){
            if(this.spriteOn === 6){
                this.spriteOn = 0;
            }
            images = images.Jump[this.spriteOn];
        }
        else if (this.mode === 'run'){
            if(this.spriteOn === 10){
                this.spriteOn = 0;
            }
            images = images.Run[this.spriteOn];
        }
        else if (this.mode === 'throw'){
            this.spriteOn = 0;
            images = images.Throw[this.spriteOn];
        }
        else if (this.mode === 'glide'){
            this.spriteOn = 0;
            images = images.Glide[this.spriteOn];
        }
        context.drawImage(images, this.X, this.Y, this.sizeX, this.sizeY);
        if(this.cycle === 5){
            this.spriteOn += 1;
            this.cycle = 0;
        }
        this.cycle += 1;
    }
}
export default Character