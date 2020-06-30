import React, { Component } from 'react';

class Homepage extends Component {
    state = {

    }
    render() {
        return (
            <div style={{backgroundColor: 'blue'}}>
                <div style={{textAlign: "center", position: 'absolute', left: '25%', top: '5%', transform: 'translate(-50%, -50%)'}}>
                    <h3>Score : {this.props.score}</h3>
                </div>
                <div style={{textAlign: "center", position: 'absolute', left: '75%', top: '5%', transform: 'translate(-50%, -50%)'}}>
                    <h3>Boss Damage : {this.props.bossScore}</h3>
                </div>
                <button onClick={() => {this.props.changePage('scorepage','homepage');}} style={{ textAlign: "center", position: 'absolute', left: '50%', top: '75%', transform: 'translate(-50%, -50%)'}}>Back</button>
            </div>


        )
    }
}

export default Homepage;