import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  async function login() {
    try {
      const data = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: userDetails.email,
          password: userDetails.password
        })
      })
      const res = await data.json();
      console.log(res, "=====>> response json");
      console.log(data, "=======>> data");

      if (data.ok) {
        console.log("loggedIn Successfully........!!!");
        navigate("/");
      }

      // if (res.token) {
      //   localStorage.setItem("token",res.token);
      //   navigate("/");
      // }


    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div>
      <h1>Login Form</h1>
      <input type="text" onChange={(e) => setUserDetails((pre) => ({ ...pre, email: e.target.value }))} placeholder='enter your email' /><br />
      <input type="text" onChange={(e) => setUserDetails((pre) => ({ ...pre, password: e.target.value }))} placeholder='enter your password' /><br />
      <button onClick={login}>Submit</button>
      <p>Already don't have an account <Link to="/sign-up">Signup</Link></p>
    </div>
  )
}

export default SignUp