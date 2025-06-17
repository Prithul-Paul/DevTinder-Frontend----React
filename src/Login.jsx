import axios from 'axios';
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
import { useUser } from './contexts/UserContext';


const Login = () => {
  const [emailId, setEmailId] = useState("ptithulpaul@gmail.com");
  const [password, setPassword] = useState("Prithul@029160");
  const [error, setError] = useState("");

  // const dispatch = useDispatch();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handelLogin = async () => {
    try{
      await axios.post(BASE_URL + "login", {
        emailId,
        password
      },
      {withCredentials: true});

      // console.log(res.data);
      // dispatch(addUser(res.data));

      const res = await axios.get(BASE_URL + 'profile/view', {
        withCredentials: true,
      });

      setUser(res.data);
      return navigate("/"); 
    }catch(err){
      console.log("ERROR : "+err.message);
      if (err.response?.status === 401) {
        const apiMessage = err.response.data?.error || "Something went worng!!!"; // 👈 read message from API
        setError(apiMessage);
      }
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
          <p className='text-amber-600 flex justify-center'>{error}</p>
          <div className="card-actions flex justify-center ">
            <button className="btn btn-lg btn-info" onClick={handelLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login