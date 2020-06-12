import React, { Component } from 'react';
import Idle from '../assets/images/Idle__000.png';
import Glide from '../assets/images/Glide_000.png';
class Preload extends Component {
    constructor(props) {
        super(props);
        this.Idle = React.createRef();
        this.Glide = React.createRef();
    }
    state = {
        images: 0,
        Idle: null,
        Glide: null,
    }
    LoadImage = (e, image) => {
        var imageNumber = this.state.images;
        imageNumber += 1;
        this.setState({
            [e.target.name]: image,
            images: imageNumber,
        },() => {
            if(this.state.images === 2){
                this.props.setNinjaImages(this.state);
            }
        })
    }
    render() {
        
        return (
            <div style={{ display: 'none' }}>
                <img name="Idle" ref={this.Idle} src={Idle} alt="ninja" onLoad={(e) => { this.LoadImage(e, this.Idle.current) }} />
                <img name='Glide' ref={this.Glide} src={Glide} alt="ninja" onLoad={(e) => { this.LoadImage(e, this.Glide.current) }} />
            </div>

        )
    }
}
export default Preload;