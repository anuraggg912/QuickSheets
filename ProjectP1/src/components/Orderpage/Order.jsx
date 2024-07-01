import React, { useState, useEffect } from 'react';
import './Order.css';
import Select from 'react-select';
import axios from 'axios';

const Order = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [timingSlot, setTimingSlot] = useState([]);
    const [isTimeDisabled, setIsTimeDisabled] = useState(true);
    const [selectedService, setSelectedService] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [numberOfItems, setNumberOfItems] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            updateTimingSlots();
            setIsTimeDisabled(false);
        } else {
            setIsTimeDisabled(true);
            setTimingSlot([]);
        }
    }, [selectedDate]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        const newValue = e.target.value;
        if (newValue === '' || /^\d+$/.test(newValue)) {
            setPhone(newValue);
            setPhoneError('');
        } else {
            setPhoneError('Please enter numbers only.');
        }
    };

    const handleDateChange = (selectedOption) => {
        setSelectedDate(selectedOption);
    };

    const serviceOptions = [
        { label: 'Printing Service', value: 'Printing' },
        { label: 'Binding Service', value: 'Binding' },
        { label: 'Printing + Binding', value: 'Printing + Binding' },
        { label: 'Other Essentials', value: 'Other Essentials' }
    ];

    const itemsOptions = {
        'Printing': ['Black & White', 'Colored', 'Custom(B&W + Color)', 'Glossy Paper'],
        'Binding': ['Normal Binding', 'Hard Binding(Silver)', 'Hard Binding(Golden)'],
        'Printing + Binding': ['Normal Binding', 'Hard Binding(Silver)', 'Hard Binding(Golden)'],
        'Other Essentials': ['Practical File', 'Stick File', 'Folder']
    };

    const handleServiceChange = (selectedOption) => {
        setSelectedService(selectedOption.value);
        setSelectedItem(''); // Reset selectedItem when service changes
        setNumberOfItems('');
        setUploadedFiles([]);
    };

    const handleItemChange = (selectedOption) => {
        setSelectedItem(selectedOption.value); // Update selectedItem correctly
    };

    const handleNumberOfItemsChange = (e) => {
        setNumberOfItems(e.target.value);
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles([...uploadedFiles, ...files]);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                console.log('Files uploaded successfully', response.data.files);
            } else {
                console.error('File upload failed', response.data.message);
            }
        } catch (error) {
            console.error('Error uploading files', error);
        }
    };

    const handleFileDelete = (fileName) => {
        setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
    };

    const generateTimingSlots = () => {
        const currentTime = new Date();
        const slots = [
            { value: '9:15am', label: '9:15 AM' },
            { value: '10:00am', label: '10:00 AM' },
            { value: '11:00am', label: '11:00 AM' },
            { value: '12:00pm', label: '12:00 PM' },
            { value: '12:50pm', label: '12:50 PM' },
            { value: '13:50pm', label: '13:50 PM' },
            { value: '14:30pm', label: '14:30 PM' },
            { value: '15:30pm', label: '15:30 PM' }
        ];

        const filteredSlots = slots.filter(slot => {
            const [slotHour, slotMinute] = slot.label.split(/[: ]/);
            const slotTime = new Date();
            slotTime.setHours(slotHour % 12 + (slot.label.includes('PM') ? 12 : 0), slotMinute, 0, 0);

            if (selectedDate && selectedDate.value === currentTime.toISOString().split('T')[0]) {
                const minSlotTime = new Date(currentTime.getTime() + 40 * 60000);
                return slotTime > minSlotTime;
            }

            return true;
        });

        return filteredSlots;
    };

    const generateWeekDates = () => {
        const dates = [];
        const today = new Date();
        const maxDays = 4;

        for (let i = 0; i < maxDays; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            if (date.getDay() !== 0) {
                dates.push({
                    value: date.toISOString().split('T')[0],
                    label: date.toDateString()
                });
            }
        }
        return dates;
    };

    const updateTimingSlots = () => {
        if (selectedDate) {
            const currentTime = new Date();
            const selectedDateTime = new Date(selectedDate.value);

            if (selectedDateTime.toDateString() === currentTime.toDateString()) {
                setTimingSlot(generateTimingSlots());
            } else {
                setTimingSlot([
                    { value: '9:15am', label: '9:15 AM' },
                    { value: '10:00am', label: '10:00 AM' },
                    { value: '11:00am', label: '11:00 AM' },
                    { value: '12:00pm', label: '12:00 PM' },
                    { value: '12:50pm', label: '12:50 PM' },
                    { value: '13:50pm', label: '13:50 PM' },
                    { value: '14:30pm', label: '14:30 PM' },
                    { value: '15:30pm', label: '15:30 PM' }
                ]);
            }
        } else {
            setTimingSlot([]);
        }
    };

    const weekDates = generateWeekDates();
    return (
        <div className="order-container">
            <div className="yourdetail">
                <h2>Your Details</h2>
            </div>
            <form className="order-form">
                <label>Your Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={name}
                    onChange={handleNameChange}
                    required
                />

                <label>Your Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                />
                {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}

                <label>Block Name</label>
                <input
                    type="text"
                    name="block"
                    placeholder="~Eg. A1, B1"
                    required
                />

                <label>Service Type</label>
                <Select
                    name="service"
                    options={serviceOptions}
                    placeholder="Choose Service"
                    value={serviceOptions.find(option => option.value === selectedService)}
                    onChange={handleServiceChange}
                    required
                />

                {selectedService && (
                    <>
                        <label>Select Option</label>
                        <Select
                            name="item"
                            options={itemsOptions[selectedService].map(item => ({ value: item, label: item }))}
                            placeholder="Choose option"
                            value={{ value: selectedItem, label: selectedItem }}
                            onChange={handleItemChange}
                            required
                        />
                    </>
                )}

                {selectedService === 'Other Essentials' && selectedItem && (
                    <>
                        <label>Number of Items</label>
                        <input
                            type="number"
                            name="numberOfItems"
                            placeholder="Enter number of items"
                            value={numberOfItems}
                            onChange={handleNumberOfItemsChange}
                            required
                        />
                    </>
                )}

                {(selectedService === 'Printing' || selectedService === 'Binding' || selectedService === 'Printing + Binding') && selectedItem && (
                    <>
                        <label>Upload Files</label>
                        <input
                            type="file"
                            name="files"
                            multiple
                            onChange={handleFileUpload}
                            required
                        />
                        <div className="uploaded-files">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="uploaded-file">
                                    <span>{file.name}</span>
                                    <button type="button" onClick={() => handleFileDelete(file.name)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
    
                    {selectedService === 'Printing' && selectedItem === 'Custom(B&W + Color)' && (
                        <>
                            <label><i>*You can write your preference for custom pages in the text box below.</i></label>
                            <textarea name="preference" rows="3" placeholder="Write your preference here..."></textarea>
                        </>
                    )}
    
                    <label>Day</label>
                    <Select
                        name="day"
                        options={weekDates}
                        value={selectedDate}
                        placeholder="Choose Day of Delivery"
                        onChange={handleDateChange}
                        required
                    />
    
                    <label>Preferred Timing</label>
                    <Select
                        name="time"
                        options={timingSlot}
                        placeholder="Choose Time of Delivery"
                        isDisabled={isTimeDisabled}
                        required
                    />
    
                    <label>Any Additional Note/Specific Requirements in Order? Write here-</label>
                    <textarea
                        name="message"
                        rows="2"
                        placeholder="(optional)"
                    ></textarea>
                    <button className="btn-confirm" type="submit">Submit</button>
                    <div className="ImportantNote">
                        <span>Important Note: </span>
                        <span> Your order will be delivered at the center gate of your block.</span>
                    </div>
                </form>
            </div>
        );
    };
    
    export default Order;
    