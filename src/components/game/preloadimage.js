import React, { Component } from 'react';
import Boss from '../assets/images/boss.png';
import Glide from '../assets/images/Glide_000.png';
import Jump1 from '../assets/images/Jump__000.png';
import Jump2 from '../assets/images/Jump__001.png';
import Jump3 from '../assets/images/Jump__002.png';
import Jump4 from '../assets/images/Jump__006.png';
import Jump5 from '../assets/images/Jump__007.png';
import Jump6 from '../assets/images/Jump__009.png';
import Kunai from '../assets/images/Kunai.png';
import Run1 from '../assets/images/Run__000.png';
import Run2 from '../assets/images/Run__001.png';
import Run3 from '../assets/images/Run__002.png';
import Run4 from '../assets/images/Run__003.png';
import Run5 from '../assets/images/Run__004.png';
import Run6 from '../assets/images/Run__005.png';
import Run7 from '../assets/images/Run__006.png';
import Run8 from '../assets/images/Run__007.png';
import Run9 from '../assets/images/Run__008.png';
import Run10 from '../assets/images/Run__009.png';
import Throw from '../assets/images/Throw__004.png';
class Preload extends Component {
    constructor(props) {
        super(props);
        this.Boss = React.createRef();
        this.Glide = React.createRef();
        this.Jump1 = React.createRef();
        this.Jump2 = React.createRef();
        this.Jump3 = React.createRef();
        this.Jump4 = React.createRef();
        this.Jump5 = React.createRef();
        this.Jump6 = React.createRef();
        this.Kunai = React.createRef();
        this.Run1 = React.createRef();
        this.Run2 = React.createRef();
        this.Run3 = React.createRef();
        this.Run4 = React.createRef();
        this.Run5 = React.createRef();
        this.Run6 = React.createRef();
        this.Run7 = React.createRef();
        this.Run8 = React.createRef();
        this.Run9 = React.createRef();
        this.Run10 = React.createRef();
        this.Throw = React.createRef();
    }
    state = {
        images: 0,
        Boss: [],
        Glide: [],
        Jump: [],
        Run: [],
        Throw: [],
        Kunai: [],
    }
    LoadImage = (e, image) => {
        var imageNumber = this.state.images;
        imageNumber += 1;
        var ImageName = e.target.name;
        var theImage = [];
        if (ImageName === 'Jump') {
            theImage = [...this.state.Jump];
        }
        else if (ImageName === 'Run') {
            theImage = [...this.state.Run];
        }
        theImage[e.target.alt] = image;
        this.setState({
            [ImageName]: theImage,
            images: imageNumber,
        }, () => {
            if (this.state.images === 20) {
                this.props.setNinjaImages(this.state);
            }
        })
    }
    render() {

        return (
            <div style={{ display: 'none' }}>
                <img name="Boss" ref={this.Boss} src={Boss} alt="0" onLoad={(e) => { this.LoadImage(e, this.Boss.current) }} />
                <img name='Glide' ref={this.Glide} src={Glide} alt="0" onLoad={(e) => { this.LoadImage(e, this.Glide.current) }} />
                <img name='Jump' ref={this.Jump1} src={Jump1} alt="0" onLoad={(e) => { this.LoadImage(e, this.Jump1.current) }} />
                <img name='Jump' ref={this.Jump2} src={Jump2} alt="1" onLoad={(e) => { this.LoadImage(e, this.Jump2.current) }} />
                <img name='Jump' ref={this.Jump3} src={Jump3} alt="2" onLoad={(e) => { this.LoadImage(e, this.Jump3.current) }} />
                <img name='Jump' ref={this.Jump4} src={Jump4} alt="3" onLoad={(e) => { this.LoadImage(e, this.Jump4.current) }} />
                <img name='Jump' ref={this.Jump5} src={Jump5} alt="4" onLoad={(e) => { this.LoadImage(e, this.Jump5.current) }} />
                <img name='Jump' ref={this.Jump6} src={Jump6} alt="5" onLoad={(e) => { this.LoadImage(e, this.Jump6.current) }} />
                <img name='Kunai' ref={this.Kunai} src={Kunai} alt="0" onLoad={(e) => { this.LoadImage(e, this.Kunai.current) }} />
                <img name='Run' ref={this.Run1} src={Run1} alt="0" onLoad={(e) => { this.LoadImage(e, this.Run1.current) }} />
                <img name='Run' ref={this.Run2} src={Run2} alt="1" onLoad={(e) => { this.LoadImage(e, this.Run2.current) }} />
                <img name='Run' ref={this.Run3} src={Run3} alt="2" onLoad={(e) => { this.LoadImage(e, this.Run3.current) }} />
                <img name='Run' ref={this.Run4} src={Run4} alt="3" onLoad={(e) => { this.LoadImage(e, this.Run4.current) }} />
                <img name='Run' ref={this.Run5} src={Run5} alt="4" onLoad={(e) => { this.LoadImage(e, this.Run5.current) }} />
                <img name='Run' ref={this.Run6} src={Run6} alt="5" onLoad={(e) => { this.LoadImage(e, this.Run6.current) }} />
                <img name='Run' ref={this.Run7} src={Run7} alt="6" onLoad={(e) => { this.LoadImage(e, this.Run7.current) }} />
                <img name='Run' ref={this.Run8} src={Run8} alt="7" onLoad={(e) => { this.LoadImage(e, this.Run8.current) }} />
                <img name='Run' ref={this.Run9} src={Run9} alt="8" onLoad={(e) => { this.LoadImage(e, this.Run9.current) }} />
                <img name='Run' ref={this.Run10} src={Run10} alt="9" onLoad={(e) => { this.LoadImage(e, this.Run10.current) }} />
                <img name='Throw' ref={this.Throw} src={Throw} alt="0" onLoad={(e) => { this.LoadImage(e, this.Throw.current) }} />
            </div>

        )
    }
}
export default Preload;