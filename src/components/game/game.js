import React, { Component } from 'react';
import Character from './character';
import Ground from './ground';
import Preloadimage from './preloadimage';
import Kunai from './kunai';
import Wall from './wall';
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
        Traps: [],
        Enemy: new Character(),
        start: false,
        wallTimer: null,
        mineTimer: null,
    }

    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        window.addEventListener('touchmove', ev => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
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
            if (this.state.Traps.length !== 0) {
                for (var i = 0; i < this.state.Traps.length; i++) {
                    this.state.Traps[i].render(this.state);
                }
            }
            if (this.state.Kunai) {
                this.state.Kunai.render(this.state);
            }
        }
        requestAnimationFrame(() => { this.update() });
    }
    setNinjaImages = (images) => {
        this.setState({
            NinjaImage: images,
            start: true,
        })
    }
    beginGame = () => {
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
                else if (this.state.Character.mode === 'jump') {
                    this.state.Character.charMode('glide');
                }
                else if (this.state.Character.mode === 'glide'){
                    this.state.Character.charMode('idle');
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
        this.setTraps(true, true);
        this.setState({
            start: false,
        })
    }
    setTraps = (wall, mine) => {
        var number;
        var wallTimer = this.state.wallTimer;
        var mineTimer = this.state.mineTimer;
        var newTrap;
        if (wall) {
            number = Math.floor(Math.random() * 4000) + 1000;
            newTrap = new Wall();
            wallTimer = setTimeout(() => {
                this.setTraps(true, false);
            }, number);
        }
        if (mine) {
            number = Math.floor(Math.random() * 4000) + 1000;
            newTrap = new Wall();
            mineTimer = setTimeout(() => {
                this.setTraps(false, true);
            }, number);
        }
        var allTraps = [...this.state.Traps];
        allTraps.push(newTrap);
        this.setState({
            Traps: allTraps,
            wallTimer: wallTimer,
            mineTimer: mineTimer
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: 'skyblue', width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                {this.state.start ?
                    <div style={{ width: '100%', height: '100vh', backgroundColor: 'black', opacity: 0.7, position: 'fixed', top: 0, left: 0 }}>
                        <div onClick={() => { this.beginGame() }} style={{ color: 'white', textAlign: "center", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', border: 'dashed 1px white', padding: '10px' }}>
                            START
                        </div>
                        <div style={{ color: 'white', textAlign: "center", position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)', padding: '10px' }}>
                            JUMP / GLide <br /> (LEFT)
                        </div>
                        <div style={{ color: 'white', textAlign: "center", position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)', padding: '10px' }}>
                            ATTACK <br /> (RIGHT)
                        </div>
                    </div>
                    : <div />
                }
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