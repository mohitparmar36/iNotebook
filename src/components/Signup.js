import { useState } from "react";
import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if(json.success){
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully","success")
    }

    else{
      props.showAlert("User already exists with this email !","danger")
    }

    
  };

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
}
  return (
    <div className="main">
      <div className="signup-container">
        <h2 className="signup-title">Create an Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" value={credentials.name} onChange={onChange} id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" value={credentials.email} onChange={onChange} id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" value={credentials.password} onChange={onChange} id="password" name="password" required />
          </div>

          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password:</label>
            <input type="password" value={credentials.cpassword} onChange={onChange} id="cpassword" name="cpassword" required />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
