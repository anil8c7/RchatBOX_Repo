import React from "react";
import "./login.css";
import { useState } from "react";
import { signin } from "../../Services/apiService";
// import { useNavigate } from "react-router-dom";

const Login = () => {
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signin(formData);
            setMessage(response.data.message);
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.message);
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="signIn">
                <div className="loginDiv">
                    <div className="loginMainDiv">
                        <div className="loginForm">
                            <div className="loginUpheading">
                                <h2>Login Form</h2>
                            </div>
                            <form action="#" method="post" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" autoComplete="" onChange={handleChange} />
                                </div>
                                <div className="loginBtnDiv">
                                    <button type="submit" className="loginBtn">Login</button>
                                </div>
                                <div className="alreadyAccount">
                                    <span>Don't have an account </span>
                                    <a href="/signup">Sign up</a>
                                </div>
                            </form>
                        </div>
                        <div className="loginImage">
                            <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="loginImage" />
                        </div>
                    </div>
                </div>
                {message && <div className="error-message">{message}</div>}
            </div>
        </>
    );
}
export default Login;