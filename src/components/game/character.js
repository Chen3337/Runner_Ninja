class Character {
    constructor() {
        this.character = 'ninja';
        this.mode = "run";
        this.cycle = 0;
        this.spriteOn = 0;
        this.X = 0;
        this.Y = window.innerHeight * 0.7;
        this.sizeX = window.innerWidth * 0.06;
        this.sizeY = window.innerHeight * 0.15;
        this.JumpHeight = this.sizeY /14;
        this.Jumpcycle = 0;
        this.flashing = 0;
        this.flash = false;
    }
    charMode(newMode){
        this.mode = newMode;
        this.cycle = 0;
        this.spriteOn = 0;
        this.Jumpcycle = 0;
    }
    gotHit(){
        this.flashing = 0;
        this.flash = true;
    }
    render(state) {
        var context = state.context;
        var images = state.NinjaImage;
        if(this.mode === 'idle'){
            images = images.Jump[this.spriteOn];
            this.Y = this.Y + this.JumpHeight;
            if(this.Y > (window.innerHeight * 0.7)){
                this.Y = window.innerHeight * 0.7;
                this.charMode('run');
            }
        }
        else if (this.mode === 'jump'){
            if(this.cycle === 8){
                this.spriteOn += 1;
                this.cycle = 0;
            }
            if(this.Jumpcycle < 28){
                this.Y -= this.JumpHeight;
            }
            else{
                this.Y += this.JumpHeight * 1.5;
            }
            if(this.spriteOn === 6){
                this.spriteOn = 0;
            }
            images = images.Jump[this.spriteOn];
            this.Jumpcycle += 1;
            if(this.Jumpcycle === 46){
                this.Y = window.innerHeight * 0.7;
                this.charMode('run');
            }
        }
        else if (this.mode === 'run'){
            if(this.cycle === 5){
                this.spriteOn += 1;
                this.cycle = 0;
            }
            if(this.spriteOn === 10){
                this.spriteOn = 0;
            }
            images = images.Run[this.spriteOn];
        }
        else if (this.mode === 'throw'){
            if(this.cycle === 5){
                this.charMode('idle');
            }
            images = images.Throw[this.spriteOn];
        }
        else if (this.mode === 'glide'){
            images = images.Glide[this.spriteOn];
            this.Y = this.Y + (this.JumpHeight / 4);
            if(this.Y > (window.innerHeight * 0.7)){
                this.Y = window.innerHeight * 0.7;
                this.charMode('run');
            }
        }
        if(this.flash){
            this.flashing +=1
            if(this.flashing > 5 && this.flashing < 16){
                context.drawImage(images, this.X, this.Y, this.sizeX, this.sizeY);
            }
            else if (this.flashing > 20 && this.flashing < 31){
                context.drawImage(images, this.X, this.Y, this.sizeX, this.sizeY);
            }
            if(this.flashing > 30){
                this.flash = false;
            }
        }
        else{
            context.drawImage(images, this.X, this.Y, this.sizeX, this.sizeY);
        }
        
        this.cycle += 1;
    }
}
export default Character