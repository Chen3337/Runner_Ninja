import React, { Component } from 'react';
import Homepage from './homepage/homepage';
import Gamepage from './game/game';
import Scorepage from './score/score';
import Musicfile from './assets/daydreamer.mp3';
class Router extends Component {
    state = {
        homepage: true,
        gamepage: false,
        scorepage: false,
        music: null,
        score: null,
        bossScore: null,
    }
    componentDidMount() {
        var musicAudio = new Audio(Musicfile);
        musicAudio.loop = true;
        this.setState({
            music: musicAudio,
        })
    }
    changePage = (onPage, toPage, score, bossScore) => {
        this.setState({
            [toPage]: true,
            [onPage]: false,
            score: score,
            bossScore: bossScore
        })
    }
    render() {
        return (
            <div>
                {this.state.homepage ?
                    <Homepage musicOn={this.state.music} changePage={this.changePage} />
                    : <div />
                }
                {this.state.gamepage ?
                    <Gamepage changePage={this.changePage} />
                    : <div />
                }
                {this.state.scorepage ?
                    <Scorepage changePage={this.changePage} score={this.state.score} bossScore={this.state.bossScore}/>
                    : <div />
                }
            </div>


        )
    }
}

export default Router;