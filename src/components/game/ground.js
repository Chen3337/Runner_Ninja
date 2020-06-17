class Ground {
    constructor() {
        this.X = 0;
        this.Height = window.innerHeight;
        this.Width = window.innerWidth;
        this.Y = this.Height * 0.84;

    }
    render(state){
        var context = state.context;
        context.fillRect(this.X, this.Y, this.Width, this.Height * 0.15);
    }
}
export default Ground;