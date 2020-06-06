import React, { Component } from 'react';
import Homepage from './homepage/homepage';
import Gamepage from './game/game';
import Scorepage from './score/score';
class Router extends Component {
    state = {
        homepage: true,
        gamepage: false,
        scorepage: false,
        music: new Audio(process.env.PUBLIC_URL + 'daydreamer.mp3'),
    }
    componentDidMount(){
        this.state.music.play();
        this.state.music.addEventListener('ended', () => {this.state.music.play();});
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