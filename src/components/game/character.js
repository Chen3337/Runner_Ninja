import Idle from '../assets/images/Idle__000.png';
class Character {
    constructor(){
        this.character = 'ninja';
        this.imagenow = new Image();
        this.mode = "idle";
        this.Idle = [Idle];
        this.Running = [];
        this.Fly = [];
        this.Jump = []
    }
    render(state) {
        this.imagenow.src = Idle;
        var context = state.context;
        context.drawImage(this.imagenow, 0, 0, 100, 100);
    }
}
export default Character