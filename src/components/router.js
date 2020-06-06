import React, { Component } from 'react';
import Homepage from './homepage/homepage';
import Gamepage from './game/game';
import Scorepage from './score/score';
class Router extends Component {
    state = {
        homepage: true,
        gamepage: false,
        scorepage: false,
    }
    componentDidMount(){
        console.log(process.env.PUBLIC_URL);
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