import Imagesurl from '../assets/imageurl'
class Character {
    constructor(){
        this.character = 'ninja';
        this.run = [

        ]
    }
    imageLoading(){
        // add all the images into the run or means preload
        for(var i=0; i < Imagesurl.length; i++){
            var img = new Image();
            img.src = Imagesurl[i];
            this.run.push(img);
        }
    }
    render(){
        console.log();
    }
}
export default Character