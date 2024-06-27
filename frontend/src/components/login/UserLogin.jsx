import React, { useState } from 'react'
import { signin } from "../../Services/authService";
import "./userlogin.css";
import MobileCodeSelect from '../MoblieCodeSelect/MobileCodeSelect';
function UserLogin() {

    const [message, setMessage] = useState("");
    const [errorClass, setErrorClass] = useState("");
    const [formData, setFormData] = useState({
        mobileCode:'',
        phoneNumber: "",
    });
    const validateLoginForm = (formData) => {
        const newErrors = {};
        if (formData.phoneNumber === "") {
            newErrors.phoneNumber = "Phone Number is required"
        }else{
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if(!phoneRegex.test(formData.phoneNumber)){
                newErrors.phoneNumber = "Invalid Mobile Nummber"
                setMessage("Invalid Mobile Number")
            }
        } 
        return newErrors;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = validateLoginForm(formData);
        if (Object.keys(newError).length > 0) {
            setErrorClass(newError);
            return;
        }
        try {
            const response = await signin(formData);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }
    const handleChange = (e) => {
        setErrorClass((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: '',
        }));
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="signIn">
                <div className="loginDiv">
                    <div className="loginMainDiv">
                        <div className="loginForm">
                            <div className="loginUpheading">
                                <h2>User Login Form</h2>
                            </div>
                            <form action="#" method="post" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className='col-1'>
                                        <select name="mobileCode" id="mobileCode" value={formData.mobileCode} onChange={handleChange}>
                                        <MobileCodeSelect />
                                        </select>
                                        
                                    </div>
                                    <div className="col-2">
                                        <input type="text" id="phoneNumber" placeholder="Enter Phone Number" className={errorClass.phoneNumber ? "error_msg_req" : ""} name="phoneNumber" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="loginBtnDiv">
                                    <button type="submit" className="loginBtn">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="loginImage">
                            <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="loginImage" />
                        </div>
                    </div>
                </div>
                <div className={`error-message ${message ? 'visible' : ''}`}>{message}</div>
                </div>
        </>
    );
}

export default UserLogin