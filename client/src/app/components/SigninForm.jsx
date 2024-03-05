'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SigninForm = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a request to the backend to sign in
            const res = await axios.post('/api/signin', { name, phoneNumber, aadharNumber });
            console.log(res);
            if (res.status === 200) {
                router.push('/voter'); // Redirect to dashboard after successful sign in
                alert("Sign in successful");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Invalid Credentials. Please try again.');
        }
    };  

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="aadharNumber">Aadhar Number:</label>
                    <input type="text" id="aadharNumber" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} required />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="submit-button">Sign In</button>
            </form>
        </div>
    );
};

export default SigninForm;
