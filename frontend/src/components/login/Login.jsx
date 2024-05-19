import React from "react";
import "./login.css";
const Login = () => {

    return (
        <>
            <div className="signup">
                <div className="signUpheading">
                <h2>Signup Form</h2>
                </div>
                <div className="signupMainDiv">
                    <div className="signupform">
                    <form action="#" method="post" >
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" autoComplete="" required />
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
            </div>
        </>
    );
}
export default Login;