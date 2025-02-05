import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginImg from '../assets/login.jpg';
import RegisterImg from '../assets/register.jpg';
import ForgotImg from '../assets/forgot.jpg';
import '../styles/login.css';
import LogoImg from '../assets/logo.png';
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";
import { loginUser, registerUser, forgotPassword } from "../services/api";
import axios from "axios";
const Login = () => {
    const [formMode, setFormMode] = useState("signin");
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z][^\s@]*@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateFirstname = (firstname)=>{
        const firstnameRegex = /^[a-zA-Z\s]+$/;
        return firstnameRegex.test(firstname);
    }
    
    const validateLastname = (lastname)=>{
        const lastnameRegex = /^[a-zA-Z\s]+$/;
        return lastnameRegex.test(lastname);
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{7,17}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email. Please make sure the email contains '.com' and follows the correct format.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Invalid password. It must be 8-18 characters long, start with a letter, and include at least one number and one special character.");
            return;
        }

        try {
            const response = await loginUser(email, password);
            dispatch(login(response));
            setSuccessMessage("Logged in successfully");
            navigate("/");
        }catch(error){
            setError(error.message || "Login failed");
        }

        const userData = {firstname}

        dispatch(login(userData));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!firstname || !lastname || !email || !password) {
            setError("Please fill out all fields.");
            return;
        }
        if(!validateFirstname(firstname)){
            setError("Invalid firstname. Firstname should contain only letters and spaces. ");
            return;
        }
        if(!validateLastname(lastname)){
            setError("Invalid lastname. Lastname should contain only letters and spaces.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email. Please make sure the email contains '@domain.com' and follows the correct format.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Invalid password. It must be 8-18 characters long, start with a letter, and include at least one number and one special character.");
            return;
        }
        try{
            const response = await registerUser(`${firstname} ${lastname}`, email, password);
            setSuccessMessage("Signed up successfully");
            setFormMode("signin");
        }catch(error) {
            setError(error.message || "Registration failed");
        }
        setFormMode('signin');
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your registered email...');
            return;
        }

        setError('');
        setSuccessMessage('Password reset link sent to your email!');
        console.log('Reset password for ', email);
    };

    const changeFormMode = (mode) => {
        setFormMode(mode);
        setError('');
        setSuccessMessage('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    const renderForm = (title, children) => (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
                    <img src={formMode === "signin" ? LoginImg : formMode === "signup" ? RegisterImg : ForgotImg}
                        alt="form visual"
                        className={`img-fluid rounded ${formMode === 'forgot' ? 'forgot-img' : ''}`}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <form className="p-4 rounded shadow bg-white">
                        <div className="logo-container">
                            <img src={LogoImg} alt="logo" style={{ marginLeft: '14rem' }} className="company-logo" />
                        </div>
                        <h3 className="text-center mb-4">{title}</h3>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {children}
                    </form>
                </div>
            </div>
        </div>
    );

    if (formMode === 'signin') {
        return renderForm(
            "Sign In",
            <>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="domain@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign In</button>
                </div>
                <div className="text-center mt-3">
                    <span className="text-primary cursor-pointer" onClick={() => changeFormMode("forgot")}>
                        Forgot Password?
                    </span>
                </div>
                <div className="text-center mt-3">
                    Not Registered Yet?{" "}
                    <span className="text-primary cursor-pointer" onClick={() => changeFormMode("signup")}>
                        Sign Up
                    </span>
                </div>
            </>
        );
    }

    if (formMode === 'signup') {
        return renderForm(
            "Sign Up",
            <>
                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g Jane"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Doe"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="domain@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
                </div>
                <div className="text-center mt-3">
                    Already Registered?{" "}
                    <span className="text-primary cursor-pointer" onClick={() => changeFormMode("signin")}>
                        Sign In
                    </span>
                </div>
            </>
        );
    }

    if (formMode === 'forgot') {
        return renderForm(
            "Forgot Password",
            <>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={handleForgotPassword}>
                        Reset Password
                    </button>
                </div>
                <div className="text-center mt-3">
                    Back to{" "}
                    <span className="text-primary cursor-pointer" onClick={() => changeFormMode("signin")}>
                        Sign In
                    </span>
                </div>
            </>
        );
    }
};

export default Login;
