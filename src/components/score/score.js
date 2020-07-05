import React, { Component } from 'react';

class Homepage extends Component {
    state = {

    }
    render() {
        return (
            <div style={{backgroundColor: 'skyblue', width: "100%", height: "100vh" }}>
                <h1 style={{fontSize: '36px',margin:0,position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%, -50%)'}}>Your Score</h1>
                <div style={{textAlign: "center", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <h3>Score : {this.props.score}</h3>
                    <h3>Boss Damage : {this.props.bossScore}</h3>
                </div>
                <button onClick={() => {this.props.changePage('scorepage','homepage');}} style={{ textAlign: "center", position: 'absolute', left: '50%', top: '75%', transform: 'translate(-50%, -50%)', backgroundColor:'#9ACD32', border: 'none', padding: '10px'}}>Continue</button>
            </div>
        )
    }
}

export default Homepage;