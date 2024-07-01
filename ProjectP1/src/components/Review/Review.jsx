import React, { useRef } from 'react';
import './Review.css';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import person from '../../assets/person.png';


const Testimonials = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if (tx > -50) {
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };

    const slideBackward = () => {
        if (tx < 0) {
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };

    return (
        <div className="testimonials">
            <img src={next_icon} alt="next" className="next-btn" onClick={slideForward} />
            <img src={back_icon} alt="back" className="back-btn" onClick={slideBackward} />
            <div className="slider">
                <ul ref={slider}>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={person} alt="" />
                                <div>
                                    <h3>Milind Kheriyal</h3>
                                    <span>2nd Year, CSE, Chandigarh University</span>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, exercitationem illum quas reiciendis inventore nihil!</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={person} alt="" />
                                <div>
                                    <h3>Avnit Kumar</h3>
                                    <span>4th Year, CSE, Chandigarh Univeristy</span>
                                </div>
                            </div>
                            <p>"Absolutely great service! Getting my printouts delivered and that for free is what i loved about Quicksheets."</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={person} alt="" />
                                <div>
                                    <h3>Vigyat Thakur</h3>
                                    <span>3rd Year, CSE, Chandigarh University</span>
                                </div>
                            </div>
                            <p>"I had a great experience with this service. It has been so convenient. Now i do not have to wait in shops for such a long time to get printouts."</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={person} alt="" />
                                <div>
                                    <h3>Girl</h3>
                                    <span>Address4</span>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, exercitationem illum quas reiciendis inventore nihil!</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Testimonials;