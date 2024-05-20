import React from "react";
import "./login.css";
import { useState } from "react";
import { signin } from "../../Services/apiService";
const Login = () => {
    const [message, setMessage] = useState("");
    const [formData,setFormData] = useState({
        email:"",
        password:""
});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await signin(formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);

        }
    }
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
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
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" autoComplete="" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn">Signup</button>
                    </form>
                    </div>
                    {/* <div className="signupimage">
                        <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="signupimage" />
                    </div> */}
                    <div className="alreadyAccount">
                        <a href="/signup">Sign up</a>
                    </div>
                </div>
                {message && <div className="error-message">{message}</div>}
            </div>
        </>
    );
}
export default Login;