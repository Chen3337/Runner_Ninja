import React, { Component } from 'react';
import Character from './character';
import Ground from './ground';
import Preloadimage from './preloadimage';
import Kunai from './kunai';
import Wall from './wall';
import Mine from './mine';
import Boss from './boss';
class Game extends Component {
    constructor(props) {
        // this.props.changePage('gamepage','scorepage');
        super(props);
        this.canvas = React.createRef();
        this.Idle = React.createRef();
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
        score: 0,
        bossScore: 0,
        scoreTimer: null,
        Boss: new Boss(),
        EndGame: false,
    }
    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        window.addEventListener('touchmove',this.preventdefault, { passive: false });
        window.addEventListener('touchforcechange', this.preventdefault, { passive: false });
        this.setState({
            context: context,
        })
        requestAnimationFrame(() => { this.update() });
    }
    componentWillUnmount() {
        window.removeEventListener('touchstart', this.Charatermotions, { passive: false });
        window.removeEventListener('touchmove',this.preventdefault, { passive: false });
        window.removeEventListener('touchforcechange', this.preventdefault, { passive: false });
        clearInterval(this.state.scoreTimer);
        clearTimeout(this.state.mineTimer);
        clearTimeout(this.state.wallTimer);
    }
    preventdefault = (ev) =>{
        ev.preventDefault();
        ev.stopImmediatePropagation();
    }
    update = () => {
        if (this.state.context !== null && this.state.NinjaImage !== null) {
            this.state.context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            this.state.Character.render(this.state);
            this.state.Ground.render(this.state);
            this.state.Boss.render(this.state);
            if (this.state.Traps.length !== 0) {
                for (var i = 0; i < this.state.Traps.length; i++) {
                    this.state.Traps[i].render(this.state);
                    if (this.state.Traps[i].X < -100) {
                        var array = [...this.state.Traps];
                        array.splice(i, 1);
                        i -= 1;
                        this.setState({ Traps: array });
                    }
                }
                for (var j = 0; j < this.state.Traps.length; j++) {
                    var Trap = this.state.Traps[j];
                    if (Trap.trap === 'wall') {
                        if (Trap.X < (this.state.screenWidth * 0.05) && Trap.X > (this.state.screenWidth * 0.01)) {
                            if ((this.state.Character.Y + this.state.Character.sizeY) > Trap.Y) {
                                console.log('touched wall');
                                this.gameOver();
                            }
                        }
                    }
                    else if (Trap.trap === 'mine') {
                        if (Trap.X < (this.state.screenWidth * 0.05) && Trap.X > (this.state.screenWidth * 0.01)) {
                            if ((this.state.Character.Y + this.state.Character.sizeY) > Trap.Y) {
                                this.gameOver();
                            }
                        }
                    }
                }
            }
            if (this.state.Kunai) {
                this.state.Kunai.render(this.state);
                if(this.state.Kunai.X > this.state.screenWidth){
                    this.setState({Kunai: null});
                }
                else if(this.state.Kunai.X > (this.state.screenWidth * 0.93) && this.state.Kunai.X < (this.state.screenWidth * 0.95)){
                    if(this.state.Kunai.Y > (this.state.Boss.Y - this.state.screenHeight * 0.05) && this.state.Kunai.Y < (this.state.Boss.Y + this.state.screenHeight * 0.18)){
                        var newbossScore = this.state.bossScore + 1;
                        this.setState({
                            bossScore: newbossScore,
                            Kunai: null,
                        });
                    }
                }
            }
        }
        if(!this.state.EndGame){
            requestAnimationFrame(() => { this.update() });
        }
    }
    setNinjaImages = (images) => {
        this.setState({
            NinjaImage: images,
            start: true,
        })
    }
    Charatermotions = (ev) =>{
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
            else if (this.state.Character.mode === 'glide') {
                this.state.Character.charMode('idle');
            }
        }
        else {
            if (this.state.Character.mode === 'run' || this.state.Character.mode === 'glide' || this.state.Character.mode === 'jump') {
                if(!this.state.Kunai){
                    this.state.Character.charMode('throw');
                    this.setState({
                        Kunai: new Kunai(this.state.Character.Y),
                    })
                }
            }
        }
    }
    beginGame = () => {
        window.addEventListener('touchstart', this.Charatermotions, { passive: false });
        this.setTraps(true, true);
        var scoretimer = setInterval(() => {
            var score = this.state.score + 1;
            console.log(score);
            this.setState({ score: score });
        }, 1000);
        this.setState({
            start: false,
            scoreTimer: scoretimer,
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
            newTrap = new Mine();
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
    gameOver = () => {
        this.setState({EndGame: true});
        this.props.changePage('gamepage','scorepage', this.state.score, this.state.bossScore);
    }
    render() {
        return (
            <div style={{ backgroundColor: 'skyblue', width: "100%", height: "100vh", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                {this.state.start ?
                    <div style={{ width: '100%', height: '100vh', backgroundColor: 'black', opacity: 0.7, position: 'fixed', top: 0, left: 0 }}>
                        <button onTouchEnd={() => { this.beginGame(); }} onMouseDown={() => { this.beginGame(); }} style={{ color: 'white', textAlign: "center", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', border: 'dashed 1px white', padding: '10px', backgroundColor: 'black', zIndex: 1000, cursor: 'pointer', display: 'inline-block' }}>
                            START
                        </button>
                        <div style={{ color: 'white', textAlign: "center", position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)', padding: '10px' }}>
                            JUMP / GLide <br /> (LEFT)
                        </div>
                        <div style={{ color: 'white', textAlign: "center", position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%)', padding: '10px' }}>
                            ATTACK <br /> (RIGHT)
                        </div>
                    </div>
                    : <div />
                }
                <div style={{textAlign: "center", position: 'absolute', left: '25%', top: '5%', transform: 'translate(-50%, -50%)'}}>
                    Score : {this.state.score}
                </div>
                <div style={{textAlign: "center", position: 'absolute', left: '75%', top: '5%', transform: 'translate(-50%, -50%)'}}>
                    Boss Damage : {this.state.bossScore}
                </div>
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