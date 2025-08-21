import React, {useState} from 'react';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    const validateForm = () => {
        setError('');
        setSuccessMessage('');

        if (!email || !password){
            setError("Both email and password are required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    const handleSumbit = async(e) => {
        e.preventDefault
    }

};