import React, { Component } from 'react';
import Homepage from './homepage/homepage';
import Gamepage from './game/game';
import Scorepage from './score/score';
class Router extends Component {
    state = {
        homepage: true,
        gamepage: false,
        scorepage: false,
        music: new Audio('https://chen3337.github.io/Runner_Ninja/daydreamer.mp3'),
    }
    componentDidMount() {
        var music = new Audio('https://chen3337.github.io/Runner_Ninja/daydreamer.mp3');
        music.autoplay = true;
        music.loop = true;
    }
    changePage = (onPage, toPage) => {
        console.log("change")
        this.setState({
            [toPage]: true,
            [onPage]: false,
        })
    }
    render() {
        return (
            <div>
                {this.state.homepage ?
                    <Homepage changePage={this.changePage} />
                    : <div />
                }
                {this.state.gamepage ?
                    <Gamepage changePage={this.changePage} />
                    : <div />
                }
                {this.state.scorepage ?
                    <Scorepage changePage={this.changePage} />
                    : <div />
                }
            </div>


        )
    }
}

export default Router;