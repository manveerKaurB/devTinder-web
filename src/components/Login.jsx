import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants';
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, {withCredentials: true})
      dispatch(addUser(response?.data?.data));
      navigate("/");
    }
    catch(err) {
      setError(err?.response?.data || "Something went wrong!!");
      console.error(err);
    }
  }

  const handleSignUp = async () => {
    try {
      const response = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password
      }, {withCredentials: true})
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    }
    catch(err) {
      setError(err?.response?.data || "Something went wrong!!");
      console.error(err);
    }
  }
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">  
            {!isLoginForm && (
              <>
                <label className="fieldset-label">First Name</label>
                <input type="text" className="input" placeholder="First Name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
                
                <label className="fieldset-label">Last Name</label>
                <input type="text" className="input" placeholder="Last Name" value={lastName}
                onChange={(e) => setLastName(e.target.value)}/>
              </>
            )}
           
            <label className="fieldset-label">Email</label>
            <input type="email" className="input" placeholder="Email" value={emailId}
            onChange={(e) => setEmailId(e.target.value)}/>
            
            <label className="fieldset-label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <p className="text-red-500">{error}</p>

            <button className="btn btn-neutral mt-4" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </fieldset>

          <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "New User ? Signup Here" : "Existing User ? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login