import React from "react";
import "./signup.css";
import { signup } from "../../Services/apiService";
import { useState } from "react";
const SignUp = () => {
    const [message, setMessage] = useState("");
    // setTimeout(() => {
    //     setMessage("");
    // }, 2000);
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await signup(formData); 
            setMessage(response.data.message);

        } catch(error){
            if (error.response) {
                setMessage(error.response.data.message);
              } else {
                setMessage("An unexpected error occurred. Please try again later.");
              }
                }
    }
    return (
        <>
            <div className="signUp">
                <div className="signUpDiv">
                    <div className="signUpMainDiv">
                        <div className="signupform">
                            <div className="signUpheading">
                                <h2>Signup Form</h2>
                            </div>
                            <form action="#" method="post" onSubmit={handleSubmit}>
                                <div className="forms-group">
                                    <label htmlFor="email">Name:</label>
                                    <input type="text" id="name" name="name" onChange={handleChange} />
                                </div>
                                <div className="forms-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" onChange={handleChange} />
                                </div>
                                <div className="forms-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" autoComplete="" onChange={handleChange} />
                                </div>
                                <div className="signUpBtnDiv">
                                    <button type="submit" className="signUpBtn">Sign Up</button>
                                </div>
                                <div className="alreadyAccount">
                                    <a href="/">Login</a>
                                </div>
                            </form>
                        </div>
                        <div className="signUpImage">
                            <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="signUpImage" />
                        </div>
                    </div>
                </div>
                {message && <div className="error-message">{message}</div>}
            </div>
        </>
    );
}
export default SignUp;