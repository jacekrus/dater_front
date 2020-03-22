import React, { Component } from 'react';
import './LoginRegisterPanelStyles.css';

export default class SlideShow extends Component {

    constructor(props) {
        super(props);
        this.slideInterval = 10000;
        this.state = {
            currentSlide: 0,
            images: [
                '/images/i1.jpg',
                '/images/i2.jpg',
                '/images/i3.jpg',
            ]
        }
    }

    doSlide(n) {
        var slide = this.state.currentSlide;
        slide=slide+n;
        const length = this.state.images.length;
        if(slide < 0 && n < 0) {
            slide = length - 1;
        }
        if(slide > (length - 1) && n > 0) {
            slide = 0;
        }
        this.setState({
            currentSlide: slide,
        })
    }

    selectSlide(n) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.doSlide(1), this.slideInterval);
        this.setState({
            currentSlide: n,
        }) 
    }

    componentDidMount() {
        this.interval = setInterval(() => this.doSlide(1), this.slideInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const images = this.state.images;
        return (
            <div className="slideShowContainer">
                <div className="slideContainer">
                    {
                        images.map((each, index) => <img alt="img" key={index} className={"loginSlide" + (this.state.currentSlide===index ? "" : " hidden")} src={each} />)
                    }
                    <ul className="sildeDotContainer">
                        {
                            images.map((each, index) => <li key={index} onClick={() => this.selectSlide(index)} className={"slideDot" + (this.state.currentSlide===index ? " slideDotActive" : "")} />)
                        }
                    </ul>
                </div>
            </div>
        );
    }

}