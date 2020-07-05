import React, { Component } from 'react';

class Homepage extends Component {
    state = {
        highscore: null,
        highbossscore: null,
        highscorepage: false,
    }
    componentDidMount(){
        var highScore = JSON.parse(localStorage.getItem('highscore'));
        if(highScore){
            if(this.props.score > highScore.score){
                highScore.score = this.props.score;
            }
            if(this.props.bossScore > highScore.bossscore){
                highScore.bossscore = this.props.bossScore;
            }
            localStorage.setItem('highscore', JSON.stringify(highScore));
        }
        else{
             highScore = {
                score: this.props.score,
                bossscore:this.props.bossScore,
            };
            localStorage.setItem('highscore', JSON.stringify(highScore));
        }
        highScore = JSON.parse(localStorage.getItem('highscore'));
        this.setState({
            highscore: highScore.score,
            highbossscore: highScore.bossscore,
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: 'skyblue', width: "100%", height: "100vh" }}>
                <h1 style={{ fontSize: '36px', margin: 0, position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%, -50%)' }}>{this.state.highscorepage ? "Highscores" : "Your Score"}</h1>
                <div style={{ textAlign: "center", position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                    <h3>Score : {this.state.highscorepage ? this.state.highscore : this.props.score}</h3>
                    <h3>Boss Damage : {this.state.highscorepage ? this.state.highbossscore : this.props.bossScore}</h3>
                </div>
                <div style={{ textAlign: "center", position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)'}}>
                    {!this.state.highscorepage ?
                        <button onClick={() => { this.setState({highscorepage: true}); }} style={{backgroundColor: '#9ACD32', border: 'none', padding: '10px' }}>Veiw Highscore</button>
                        :
                        <div />
                    }
                    
                    <br />
                    <br />
                    <button onClick={() => { this.props.changePage('scorepage', 'homepage'); }} style={{backgroundColor: '#9ACD32', border: 'none', padding: '10px' }}>Continue</button>
                </div>

            </div>
        )
    }
}

export default Homepage;