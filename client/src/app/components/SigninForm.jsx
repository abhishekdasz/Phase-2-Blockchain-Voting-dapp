'use client'
// SigninForm.js
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
                router.push('/dashboard'); // Redirect to dashboard after successful sign in
                alert("Sign in successful");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /><br />
            <label htmlFor="aadharNumber">Aadhar Number:</label>
            <input type="text" id="aadharNumber" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} required /><br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SigninForm;
