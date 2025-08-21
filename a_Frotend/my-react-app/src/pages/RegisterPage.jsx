import React, {useState} from 'react';

const Register = () => {

  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [role,setRole] = useState('');

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [successMessage,setSuccessMessage] = useState('');

  const validateForm = () => {
    setError('');
    setSuccessMessage('');
    
    if (!name || !email || !password || !confirmPassword || !role){
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please Enter a valid email address");
      return false;
    }

    if (password.length < 6){
      setError("Password must be atleast 6 characters long.");
      return false;
    }

    if (password != confirmPassword){
      setError("Password do not match");
      return false;
    }

    return true;
  }

  const handleSubmit = async(e) => {

    e.preventDefault();

    if (!validateForm()){
      return;
    }

    setLoading(true);
    try{

      const response = await new Promise(resolve => setTimeout(() => {

        resolve({success : true,message : 'Registration successful'});

      },1500));

      if (response.success){

        setSuccessMessage(response.message);

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
      }else{
        setError(response.message);
      }
    }catch(error){

      setError(error.message || 'An unexpected error occurred during registration');
    }finally{

      setLoading(false);
    }

    return ();
};
