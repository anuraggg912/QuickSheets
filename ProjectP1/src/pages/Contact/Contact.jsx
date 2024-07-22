import React, { useState } from 'react'
import './Contact.css'
import chat from '../../assets/chat.gif'
import mail_icon from '../../assets/mail-icon.png'
import phone from '../../assets/phone-icon.png'
import location from '../../assets/location-icon.png'


const Contact = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "9af821ab-3c28-4428-90c1-515cff4d16a8");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully!");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    }
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const newValue = e.target.value;

        if (newValue === '' || /^\d+$/.test(newValue)) {
            setValue(newValue);
            setError('')
        }
        else {
            setError('Please enter number only.')
        }
    }

    return (
        <div className="contact">
            <div className="contact-col">
                <h3>Get in Touch<img src={chat} alt="" /></h3>
                <p>We value your input and are eager to hear from you! Whether you have feedback about our services, questions, or suggestions for how we can improve, we want to know. Please use the form below to share your thoughts and experiences with us. Your comments are important to us and will help us better serve you. Thank you for taking the time to connect with us.</p>
                <ul>
                    <li><img src={mail_icon} alt="" />Contact@abcd.in</li>
                    <li><img src={phone} alt="" />+1 1234567890</li>
                    <li><img src={location} alt="" />Address line 1<br />Address line 2</li>

                </ul>
            </div>
            <div className="contact-col">
                <form onSubmit={onSubmit}>
                    <label></label>
                    <input type="text" name="name" placeholder="Your name*"
                        required />
                    <label></label>
                    <input type="tel"
                        value={value}
                        onChange={handleChange}
                        name="phone" placeholder="Your phone number*" required />
                    {error && <p style={{ color: 'red' }} >{error}</p>}
                    <label></label>
                    <textarea name="message" rows="6" placeholder="Enter your message*" required></textarea>
                    <button type="submit" className="btn dark-btn">Submit</button>
                </form>
                <span>{result}</span>
            </div>
        </div>
    )
}

export default Contact