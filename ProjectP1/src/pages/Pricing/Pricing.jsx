import React from 'react';
import './Pricing.css';
import printergif from '../../assets/printer.gif'
import notebookgif from '../../assets/notebook.gif'
import boxesgif from '../../assets/boxes.gif'


const Pricing = () => {
    return (
        <div className="pricing">
            <div className="service-card">
                <div className="servicegif">
                    <img src={printergif} alt="Printing Service Icon" />
                </div>
                <div className="pricing-details">
                    <h2>PRINTING SERVICE</h2>
                    <h4>(PRICING PER SHEET)</h4>
                    <div className="item">
                        <span>Black and White:</span>
                        <span>₹2</span>
                    </div>
                    <div className="item">
                        <span>Colored:</span>
                        <span>₹8</span>
                    </div>
                    <div className="item">
                        <span>Glossy Paper:</span>
                        <span>₹50</span>
                    </div>
                </div>
            </div>
            <div className="service-card">
                <div className="servicegif">
                    <img src={notebookgif} alt="Binding Service Icon" />
                </div>
                <div className="pricing-details">
                    <h2>BINDING SERVICE</h2>
                    <h4></h4>
                    <div className="item">
                        <span>Binding:</span>
                        <span>₹40</span>
                    </div>
                    <div className="item">
                        <span>Hard Binding(Silver):</span>
                        <span>₹150</span>
                    </div>
                    <div className="item">
                        <span>Hard Binding(Golden):</span>
                        <span>₹180</span>
                    </div>
                </div>
            </div>
            <div className="service-card">
                <div className="servicegif">
                    <img src={boxesgif} alt="" />
                </div>
                <div className="pricing-details">
                    <h2>OTHER ESSENTIALS</h2>
                    <h4></h4>
                    <div className="item">
                        <span>Practical File:</span>
                        <span>₹</span>
                    </div>
                    <div className="item">
                        <span>Stick File:</span>
                        <span>₹</span>
                    </div>
                    <div className="item">
                        <span>Folder:</span>
                        <span>₹</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
