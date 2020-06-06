import React, { Component } from 'react';
import Character from './character';
class Game extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.loadingPage = document.getElementById('loading');
    }
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        context: null,
        distance: window.innerWidth * 0.06,
        Character: Character,
    }

    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        this.setState({
            context: context,
        })
        requestAnimationFrame(() => { this.update() });
    }
    update = () => {
        if (this.state.context !== null) {
            this.state.context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            this.state.Character.render();
            // this.state.context.drawImage(img, 0, 0, 100, 100);
            this.state.context.rect(100,100,100,100);
            this.state.context.stroke();
        }
        requestAnimationFrame(() => { this.update() });
    }
    render() {
        return (
            <div style={{ backgroundColor: 'skyblue', width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <canvas ref={this.canvas}
                    width={this.state.screenWidth}
                    height={this.state.screenHeight}
                />
            </div>

        )
    }
}

export default Game;