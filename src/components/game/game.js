import React, { Component } from 'react';
import Character from './character';
import Ground from './ground';
import Preloadimage from './preloadimage';
import Kunai from './kunai';
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
        Kunai: null,
        NinjaImage: null,
    }

    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        window.addEventListener('touchmove', ev => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            // var clientX = ev.touches[0].clientX;
            // var clientY = ev.touches[0].clientY;
            // console.log(clientY);
        }, { passive: false });
        window.addEventListener('touchforcechange', ev => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
        }, { passive: false });
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
            if(this.state.Kunai){
                this.state.Kunai.render(this.state);
            }
        }
        requestAnimationFrame(() => { this.update() });
    }
    setNinjaImages = (images) => {
        window.addEventListener('touchstart', ev => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            var clientX = ev.touches[0].clientX;
            var clientY = ev.touches[0].clientY;
            console.log(clientX, clientY);
            if (clientX < this.state.screenWidth / 2) {
                if (this.state.Character.mode === 'run') {
                    this.state.Character.charMode('jump');
                }
                else if(this.state.Character.mode === 'jump'){
                    this.state.Character.charMode('glide');
                }
            }
            else {
                if (this.state.Character.mode === 'run') {
                    this.state.Character.charMode('throw');
                    this.setState({
                        Kunai: new Kunai(),
                    })
                }
            }
        }, { passive: false });
        this.setState({
            NinjaImage: images,
        })
    }
    render() {
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