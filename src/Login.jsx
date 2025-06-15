import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';


const Login = () => {
  const [emailId, setEmailId] = useState("ptithulpaul@gmail.com");
  const [password, setPassword] = useState("Prithul@029160");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "login", {
        emailId,
        password
      },
      {withCredentials: true});
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    }catch(err){
      console.log("ERROR : "+err.message);
    }
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-neutral text-primary-content w-96 ">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" value={emailId} className="input" placeholder="Type Email ID" onChange={(e)=>setEmailId(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} className="input" placeholder="Type Password" onChange={(e)=>setPassword(e.target.value)} />
          </fieldset>
          <div className="card-actions flex justify-center ">
            <button className="btn btn-lg btn-info" onClick={handelLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login