import React, { Component } from 'react';
import Router from './components/router';
class App extends Component {
  state = {
    isLandscape: 90,
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.checkIfLandscape();
    })
    window.addEventListener("orientationchange", () => {
      this.checkIfLandscape();
    });
    this.checkIfLandscape();
  }
  checkIfLandscape = () => {
    if ((window.innerWidth - 100) > window.innerHeight) {
      if (this.state.isLandscape !== 90) {
        window.location.href = '/Runner_Ninja/';
        this.setState({
          isLandscape: 90
        });
      }
    }
    else {
      this.setState({
        isLandscape: 0
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.isLandscape === 90
          ? <Router />
          : <h2>rotate the screen (landscape) or make the width of the screen larger than the height to begain
             <br />
            <br />
              If on phone add this to home screen for better experience (fullscreen)
              <br />
            <br />
            If on PC f11 for fullscreen
            <button onClick={() => this.setState({ isLandscape: 90})}>Force start game</button>
            </h2>
        }
      </div>
    )
  }
}

export default App;