import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constants';
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
      console.error(err);
    }
  }
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">           
            <label className="fieldset-label">Email</label>
            <input type="email" className="input" placeholder="Email" value={emailId}
            onChange={(e) => setEmailId(e.target.value)}/>
            
            <label className="fieldset-label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            
            <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default Login