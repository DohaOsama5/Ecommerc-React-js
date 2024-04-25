import React, { useEffect, useRef, useState } from 'react';
import Home from './Home';

const RegistrationForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const localSign = localStorage.getItem("signUp");
  const [showHome, setShowHome] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const localEmail = localStorage.getItem("email");
  const localName = localStorage.getItem("name");
  const localPassword = localStorage.getItem("password");
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (localSign) {
      setShowHome(true);
    }
    if (localEmail) {
      setShowSignIn(true);
    }
  }, [localSign, localEmail]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d).{6,}$/;
    return re.test(password);
  };

  const handleSignUp = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    let isValid = true;

    if (name.length < 3) {
      setNameError('Name must be at least 3 characters long');
      isValid = false;
    } else {
      setNameError('');
    }

    if (email === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length <= 5) {
      setPasswordError('Password must be more than 5 characters long');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one digit');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("signUp", true);
      alert("Account created successfully");
      window.location.reload();
    }
  }

  const handleSignIn = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (email === localEmail && password === localPassword) {
      localStorage.setItem("email", email);
      // window.location.reload();
    } else {
      alert("Incorrect email or password");
    }
  }

  const containerStyle = {
    paddingTop: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
  };

  const formStyle = {
    width: '400px', 
    padding: '20px',
    backgroundColor: '#f9f8f9',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#777',
    textAlign: 'center',
    marginBottom: '30px',
  };

  const inputSpaceStyle = {
    marginBottom: '20px',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ffb524',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Form Register</h2>
        {showHome ? (
          <Home />
        ) : (
          showSignIn ? (
            <div>
              <h1 style={headingStyle}>Hi {localName}</h1>
              <div style={inputSpaceStyle} className='input-space'>
                <input type='email' placeholder='Enter your email' ref={emailRef} />
                <div style={errorStyle}>{emailError}</div>
              </div>
              <div style={inputSpaceStyle} className='input-space'>
                <input type='password' placeholder='Enter your password' ref={passwordRef} />
                <div style={errorStyle}>{passwordError}</div>
              </div>
              <button style={buttonStyle} onClick={handleSignIn}>Sign In</button>
            </div>
          ) : (
            <div>
              <div style={inputSpaceStyle} className='input-space'>
                <input className='form-control' type='text' placeholder='Enter your name' ref={nameRef} />
                <div style={errorStyle}>{nameError}</div>
              </div>
              <div style={inputSpaceStyle} className='input-space'>
                <input className='form-control' type='email' placeholder='Enter your email' ref={emailRef} />
                <div style={errorStyle}>{emailError}</div>
              </div>
              <div style={inputSpaceStyle} className='input-space'>
                <input className='form-control' type='password' placeholder='Enter your password' ref={passwordRef} />
                <div style={errorStyle}>{passwordError}</div>
              </div>
              <button style={buttonStyle} onClick={handleSignUp}>Sign Up</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
