import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

  const [userDetails, setUserDetails] = useState({
    username : "",
    email : "",
    password : ""
  })

  const navigate = useNavigate();

  async function SignUp() {
    try {
      const data = await fetch("http://localhost:5000/api/v1/auth/signUp",{
        method : "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          username : userDetails.username , 
          email : userDetails.email, 
          password: userDetails.password
        })
      })
      const res = await data.json();
      console.log(res);
      navigate("/");
      
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div>
      <h1>Signup Form</h1>
      <input type="text" onChange={(e)=>setUserDetails((pre)=>({...pre , username : e.target.value}))} placeholder='enter your username' /><br />
      <input type="text" onChange={(e)=>setUserDetails((pre)=>({...pre , email : e.target.value}))} placeholder='enter your email' /><br />
      <input type="text" onChange={(e)=>setUserDetails((pre)=>({...pre , password : e.target.value}))} placeholder='enter your password' /><br />
      <button onClick={SignUp}>Submit</button>
      <p>don't have an account <Link to="/login">Login</Link></p>
    </div>
  )
}

export default SignUp