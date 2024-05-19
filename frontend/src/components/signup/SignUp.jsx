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
            console.log(error);
            if (error.response) {
                setMessage(error.response.data.message);
              } else {
                setMessage("An unexpected error occurred. Please try again later.");
              }
                }
    }
    return (
        <>
            <div className="signup">
                <div className="signUpheading">
                <h2>Signup Form</h2>
                </div>
                <div className="signupMainDiv">
                    <div className="signupform">
                    <form action="#" method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  />
                        </div>
                        <button type="submit" className="btn">Signup</button>
                    </form>
                    </div>
                    {/* <div className="signupimage">
                        <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="signupimage" />
                    </div> */}
                    <div className="alreadyAccount">
                        <a href="/">Sign In</a>
                    </div>
                    {message && <div className="error-message">{message}</div>}
                </div>
            </div>
        </>
    );
}
export default SignUp;