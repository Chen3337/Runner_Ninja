class Character {
    constructor(){
        this.character = 'ninja';
        this.mode = "idle";
        this.Running = [];
        this.Fly = [];
        this.Jump = []
    }
    render(state) {
        var context = state.context;
        var images = state.NinjaImage;
        if(images){
            context.drawImage(images.Idle, 0, 0, 100, 100);
        }
        
    }
}
export default Character