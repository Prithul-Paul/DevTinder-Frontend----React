import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const ForgetPassword = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    
    const navigate = useNavigate();

  
    const handelForgetPass = async () => {
      try{
        await axios.patch(BASE_URL + "profile/forget-password", {
          emailId,
          password
        },
        {withCredentials: true});
  
        // console.log(res.data);
        // dispatch(addUser(res.data));
  
        // const res = await axios.get(BASE_URL + 'profile/view', {
        //   withCredentials: true,
        // });
  
        // setUser(res.data);
        return navigate("/login"); 
      }catch(err){
        console.log("ERROR : "+err.message);
        if (err.response?.status === 500) {
          const apiMessage = err.response.data?.message || "Something went worng!!!";
          setError(apiMessage);
        }
      }
    }
      
    return (
      <div className='flex justify-center my-10'>
        <div className="card bg-neutral text-primary-content w-96 ">
          <div className="card-body">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="text" value={emailId} className="input" placeholder="Type Email ID" onChange={(e)=>setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" value={password} className="input" placeholder="Type Password" onChange={(e)=>setPassword(e.target.value)} />
            </fieldset>
            <p className='text-amber-600 flex justify-center'>{error}</p>
            <div className="card-actions flex justify-center ">
              <button className="btn btn-lg btn-info" onClick={handelForgetPass}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default ForgetPassword