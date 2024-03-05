'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const SignupForm = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
            const res = await axios.post('/api/signup', { name, phoneNumber, aadharNumber });
            console.log(res);
            if(res.status === 200)
            {
                router.push('/login');
                alert("Account created succesfully");
            }
        }
        catch(error)
        {
          console.log(error);
          setErrorMessage('An error occurred. Please try again later.');
        //   alert(error.response.statusText);
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm;
