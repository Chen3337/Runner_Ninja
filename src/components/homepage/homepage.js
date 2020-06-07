import React, { Component } from 'react';

class Homepage extends Component {
    render() {
        return (
            <div>
                <button onClick={() => {this.props.changePage('homepage','gamepage'); this.props.musicOn.play();} } style={{ textAlign: "center", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} >Start</button>
            </div>
        )
    }
}

export default Homepage;