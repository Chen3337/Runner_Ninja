import React, { Component } from 'react';
import NinjaImage from '../assets/images/Throw__004.png';
class Homepage extends Component {
    render() {
        return (
            <div style={{backgroundColor: 'black', width: "100%", height: "100vh" }}>
                <img style={{ height: '100vh', position: 'absolute', left: '25%', top: '50%', transform: 'translate(-50%, -50%)',}} src={NinjaImage} alt='ninja fly' />
                <img style={{ height: '100vh', position: 'absolute', left: '75%', top: '50%', transform: 'translate(-50%, -50%) scaleX(-1)',}} src={NinjaImage} alt='ninja fly' />
                <h1 style={{fontSize: '36px',margin:0 ,color:'red',position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%, -50%)'}}>Runner Ninja</h1>
                <button onClick={() => { this.props.changePage('homepage', 'gamepage'); this.props.musicOn.play(); }} style={{ textAlign: "center", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange', border: 'none', padding: '10px', fontSize: '24px' }} >START</button>
            </div>
        )
    }
}

export default Homepage;