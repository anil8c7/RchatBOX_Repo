import React from "react";
import "./signup.css";
import { signup } from "../../Services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:''
    });
    const [errorClass,setErrorClass] = useState("");
    const handleChange = (e) => {
        setErrorClass((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: '',
          }));
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      // to validate the form 
    const validateForm = (formData)=>{  
        const newErrors ={};
        if(formData.name ===""){
            newErrors.name = "name is required"
        }
        if(formData.email ===""){
            newErrors.email = "email is required"
        }
        if(formData.password ===""){
            newErrors.password = "password is required"
        }
        return newErrors;
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newError =  validateForm(formData);
        if(Object.keys(newError).length> 0){
            setErrorClass(newError);
            return;
        }
        try{
            const response = await signup(formData); 
            setMessage(response.message);
            if(response.data.status===201){
                    setTimeout(()=>{
                        navigate('/');
                    },2000)
            }
        } catch(error){
            if (error.response) {
                if(error.response.data.status===400){
                    // setErrorClass("error_msg_req");
                }
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
                                    <label htmlFor="email">Name</label>
                                    <input type="text" className={errorClass.name ? "error_msg_req":""} id="name" name="name" onChange={handleChange} />
                                </div>
                                <div className="forms-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className={errorClass.email ? "error_msg_req":""} name="email" onChange={handleChange} />
                                </div>
                                <div className="forms-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" className={errorClass.password ? "error_msg_req":""} name="password" autoComplete="" onChange={handleChange} />
                                </div>
                                <div className="signUpBtnDiv">
                                    <button type="submit" className="signUpBtn">Sign Up</button>
                                </div>
                                <div className="alreadyAccount">
                                    <span>Already have an account </span>
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