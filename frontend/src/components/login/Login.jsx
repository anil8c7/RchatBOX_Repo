import React,{ useState } from "react";
import "./login.css";
import { signin } from "../../Services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [errorClass, setErrorClass] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const validateLoginForm = (formData)=>{  
        const newErrors ={};
        if(formData.email ===""){
            newErrors.email = "email is required"
        }
        if(formData.password ===""){
            newErrors.password = "password is required"
        }
        return newErrors;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = validateLoginForm(formData);
        if(Object.keys(newError).length>0){
            setErrorClass(newError);
            return;
        }
        try {
            const response = await signin(formData);
            setMessage(response.message);
            if(response.status==201){
                navigate('/chat');
            }
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
                                <h2>Login Form</h2>
                            </div>
                            <form action="#" method="post" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className={errorClass.email ? "error_msg_req":""} name="email" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password"className={errorClass.password ? "error_msg_req":""}  name="password" autoComplete="" onChange={handleChange} />
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