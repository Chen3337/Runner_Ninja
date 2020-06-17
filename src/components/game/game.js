import React, { Component } from 'react';
import Character from './character';
import Ground from './ground';
import Preloadimage from './preloadimage';
class Game extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.Idle = React.createRef();
        // this.loadingPage = document.getElementById('loading');
    }
    state = {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        context: null,
        distance: window.innerWidth * 0.06,
        Character: new Character(),
        Ground: new Ground(),
        NinjaImage: null,
    }

    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        this.setState({
            context: context,
        })
        requestAnimationFrame(() => { this.update() });
    }
    update = () => {
        if (this.state.context !== null && this.state.NinjaImage !== null) {
            this.state.context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            this.state.Character.render(this.state);
            this.state.Ground.render(this.state);
        }
        requestAnimationFrame(() => { this.update() });
    }
    setNinjaImages = (images) => {
        this.setState({
            NinjaImage: images,
        })
    }
    render() {
        console.log(this.state.NinjaImage);
        return (
            <div style={{ backgroundColor: 'skyblue', width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <canvas ref={this.canvas}
                    width={this.state.screenWidth}
                    height={this.state.screenHeight}
                />
                <Preloadimage setNinjaImages={this.setNinjaImages} />
            </div>

        )
    }
}

export default Game;