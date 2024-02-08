import React from 'react'
import "./Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({email:"",password:""})

  const handleSubmit = async (e) =>{

      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email : credentials.email,password : credentials.password})
      });

      const json = await response.json();
      console.log(json)
      
      if(json.success){
        // 
        localStorage.setItem("token",json.authtoken);
        props.showAlert("Login Successfull !","success")
        navigate('/');
        
      }
      else{
        // 
        props.showAlert("Enter valid credentials","danger")
      }
    

  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
}

  
  return (
    <>
    <div className='bodyy'>
      <div className="login-container">
        <h2 className="login-title">Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className='login-input' value={credentials.email} onChange={onChange} name="email" required/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className='login-input' value={credentials.password} onChange={onChange} name="password" required/>

            <button type="submit"  className="login-button">Login</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default Login
