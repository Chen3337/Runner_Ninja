import React, { Component } from 'react';
import Character from './character';
import Ground from './ground';
import Preloadimage from './preloadimage';
import Kunai from './kunai';
import Wall from './wall';
import Mine from './mine';
import Boss from './boss';
import BossAttack from './bossattack';
import LifeBuff from './Lifebuff';
class Game extends Component {
    constructor(props) {
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
        bossAttackTimer: null,
        EndGame: false,
        bossAttack: null,
        Life: 1,
        lifebuff: null,
    }
    componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        window.addEventListener('touchmove', this.preventdefault, { passive: false });
        window.addEventListener('touchforcechange', this.preventdefault, { passive: false });
        this.setState({
            context: context,
        })
        requestAnimationFrame(() => { this.update() });
    }
    componentWillUnmount() {
        window.removeEventListener('touchstart', this.Charatermotions, { passive: false });
        window.removeEventListener('touchmove', this.preventdefault, { passive: false });
        window.removeEventListener('touchforcechange', this.preventdefault, { passive: false });
        clearInterval(this.state.scoreTimer);
        clearTimeout(this.state.mineTimer);
        clearTimeout(this.state.wallTimer);
        clearTimeout(this.state.bossAttackTimer);
    }
    preventdefault = (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    }
    update = () => {
        if (this.state.context !== null && this.state.NinjaImage !== null) {
            if (this.state.Life === 0) {
                this.gameOver();
            }
            this.state.context.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            this.state.Character.render(this.state);
            this.state.Ground.render(this.state);
            this.state.Boss.render(this.state);

            if (this.state.lifebuff) {
                this.state.lifebuff.render(this.state);
                if (this.state.lifebuff.X < (this.state.screenWidth * 0.05) && this.state.lifebuff.X > (this.state.screenWidth * 0.01)) {
                    if ((this.state.Character.Y + this.state.Character.sizeY) > (this.state.lifebuff.Y - this.state.screenHeight * 0.02)) {
                        var newlife = this.state.Life + 1;
                        this.setState({
                            Life: newlife,
                            lifebuff: null,
                        })
                    }
                }
            }
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
                            if ((this.state.Character.Y + (this.state.Character.sizeY * 0.75)) > Trap.Y) {
                                if (Trap.damage) {
                                    Trap.finishDamge();
                                    var lossLife = this.state.Life - 1;
                                    this.setState({
                                        Life: lossLife,
                                    })
                                }
                            }
                        }
                    }
                    else if (Trap.trap === 'mine') {
                        if (Trap.X < (this.state.screenWidth * 0.05) && Trap.X > (this.state.screenWidth * 0.01)) {
                            if ((this.state.Character.Y + this.state.Character.sizeY) > Trap.Y) {
                                if (Trap.damage) {
                                    Trap.finishDamge();
                                    var lossLife1 = this.state.Life - 1;
                                    this.setState({
                                        Life: lossLife1,
                                    })
                                }
                            }
                        }
                    }
                }
            }
            if (this.state.bossAttack) {
                this.state.bossAttack.render(this.state);
                if (this.state.bossAttack.X < (this.state.screenWidth * 0.05) && this.state.bossAttack.X > (this.state.screenWidth * 0.01)) {
                    if (this.state.bossAttack.Y > this.state.Character.Y && this.state.bossAttack.Y < (this.state.Character.Y + this.state.screenHeight * 0.13)) {
                        var lossLife2 = this.state.Life - 1;
                        this.setState({
                            Life: lossLife2,
                            bossAttack: null,
                        })
                    }
                }
            }
            if (this.state.bossAttack) {
                if (this.state.bossAttack.X < -1 * (this.state.bossAttack.sizeX)) {
                    this.setState({ bossAttack: null });
                }
            }
            if (this.state.Kunai) {
                this.state.Kunai.render(this.state);
                if (this.state.Kunai.X > this.state.screenWidth) {
                    this.setState({ Kunai: null });
                }
                else if (this.state.Kunai.X > (this.state.screenWidth * 0.93) && this.state.Kunai.X < (this.state.screenWidth * 0.95)) {
                    if (this.state.Kunai.Y > (this.state.Boss.Y - this.state.screenHeight * 0.05) && this.state.Kunai.Y < (this.state.Boss.Y + this.state.screenHeight * 0.18)) {
                        var newbossScore = this.state.bossScore + 1;
                        var buff = this.state.lifebuff;
                        if(!buff){
                            var num = Math.floor(Math.random() * 2);
                            if(num === 0){
                                buff = new LifeBuff(this.state.Boss.Y);
                            }
                        }
                        this.setState({
                            bossScore: newbossScore,
                            Kunai: null,
                            lifebuff: buff,
                        });
                    }
                }
            }
            if (this.state.Kunai && this.state.bossAttack) {
                var attackDistance = this.state.bossAttack.X - this.state.Kunai.X;
                if (attackDistance < (this.state.screenWidth * 0.02) && attackDistance > 0) {
                    if (this.state.Kunai.Y < (this.state.bossAttack.Y + this.state.screenHeight * 0.045) && this.state.Kunai.Y > (this.state.bossAttack.Y - this.state.screenHeight * 0.015)) {
                        this.setState({
                            Kunai: null,
                            bossAttack: null,
                        })
                    }
                }
            }
        }
        if (!this.state.EndGame) {
            requestAnimationFrame(() => { this.update() });
        }
    }
    setNinjaImages = (images) => {
        this.setState({
            NinjaImage: images,
            start: true,
        })
    }
    Charatermotions = (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var clientX = ev.touches[0].clientX;
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
                if (!this.state.Kunai) {
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
            this.setState({ score: score });
        }, 1000);
        this.bossAttack();
        this.setState({
            start: false,
            scoreTimer: scoretimer,
        })
    }
    bossAttack = (attack) => {
        var number = Math.floor(Math.random() * 5000) + 5000;
        var bossAttackTimer = setTimeout(() => {
            this.state.Boss.changemode('attack');
            this.bossAttack(true);
        }, number);
        var bossAtt;
        if (attack) {
            bossAtt = new BossAttack(this.state.Boss.Y, this.state.Character.Y);
        }
        this.setState({
            bossAttackTimer: bossAttackTimer,
            bossAttack: bossAtt
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
        this.setState({ EndGame: true });
        this.props.changePage('gamepage', 'scorepage', this.state.score, this.state.bossScore);
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
                <div style={{ textAlign: "center", position: 'absolute', left: '5%', top: '5%', transform: 'translate(-50%, -50%)' }}>
                    Life : {this.state.Life}
                </div>
                <div style={{ textAlign: "center", position: 'absolute', left: '40%', top: '5%', transform: 'translate(-50%, -50%)' }}>
                    Score : {this.state.score}
                </div>
                <div style={{ textAlign: "center", position: 'absolute', left: '80%', top: '5%', transform: 'translate(-50%, -50%)' }}>
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