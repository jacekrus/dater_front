import React, { Component } from 'react';
import './LoginPanel-styles.css';

export default class LoginPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            images: [
                '/images/Image1.jpg',
                '/images/Image2.jpg',
                '/images/Image3.jpg',
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
        this.interval = setInterval(() => this.doSlide(1), 5000);
        this.setState({
            currentSlide: n,
        }) 
    }

    componentDidMount() {
        this.interval = setInterval(() => this.doSlide(1), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const images = this.state.images;
        return (
            <div>
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