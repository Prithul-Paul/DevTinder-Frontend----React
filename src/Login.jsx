import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { addUser } from './utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
import { useUser } from './contexts/UserContext';


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [dob, setDob] = useState(''); 
  const [error, setError] = useState("");
  const dateRef = useRef(null);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // const dispatch = useDispatch();
  const { setUser } = useUser();
  const navigate = useNavigate();

  if(setIsLoggedIn === false){
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (dateRef.current) {
            dateRef.current.max = today;
        }
    }, []);
  }

  const handelLogin = async () => {
    try{
      await axios.post(BASE_URL + "login", {
        emailId,
        otp
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
  const handelSignup = async () => {
      try{
          const res = await axios.post(BASE_URL + "signup", {
              firstName,
              lastName,
              dob,
              emailId,
              password
          },
          {withCredentials: true});

          setUser(res.data.data);
          // setError(apiMessage);
          return navigate("/profile");

      }catch(err){
          console.log("ERROR : "+err.message);
          if (err.response?.status === 401) {
              const apiMessage = err.response.data?.error || "Something went worng!!!"; // 👈 read message from API
              setError(apiMessage);
          }
      }
  }

  const handelOtp = async () => {
      try{
        const res = await axios.post(BASE_URL + "emailLoginotp",{emailId}, {withCredentials: true});
        setIsOtpSent(res.data.sucess);
        setIsLoggedIn(true);
        // setError(res.data.error);
        if(!res.data.sucess){
          setError(res.data.error);
        }else{
          setError(res.data.msg);
        }
      }catch(err){
          console.log(err.message);
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
          <h2 className="card-title flex justify-center text-2xl">{isLoggedIn ? "Login" : "Signup"}</h2>
          {!isLoggedIn && 
            <>
              <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input type="text" value={firstName} className="input" placeholder="Type First Name" onChange={(e)=>setFirstname(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input type="text" value={lastName} className="input" placeholder="Type Last Name" onChange={(e)=>setLastname(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Date of Birth</legend>
                <input type="date" value={dob} ref={dateRef} id="dob" className="input" onChange={(e)=>setDob(e.target.value)} />
              </fieldset>
            </>
          }

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" value={emailId} className="input" placeholder="Type Email ID" onChange={(e)=>setEmailId(e.target.value)} />
          </fieldset>

          {!isOtpSent &&
            <>
            <div className="card-actions flex justify-center ">
              <button className="btn btn-lg btn-info" onClick={handelOtp}>Send OTP</button>
            </div>
            </>
          }


          {isOtpSent && isLoggedIn && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">OTP</legend>
                  <div style={{ position: 'relative' }}>
                    <input type="text" value={otp} className="input" placeholder="Enter OTP" onChange={(e)=>{
                      if (/^\d{0,5}$/.test(e.target.value)) {
                        setOtp(e.target.value)
                      }
                    }} />
                  </div>
                </fieldset>
                <div className="card-actions flex justify-center ">
                  <button className="btn btn-lg btn-info" onClick={handelLogin}>Login</button>
                </div>
              </>
          )
          }

          {!isLoggedIn &&
            <div className="card-actions flex justify-center ">
                <><button className="btn btn-lg btn-info" onClick={handelSignup}>Signup</button></> 
            </div>
          }
          <p className='text-amber-600 flex justify-center'>{error}</p>




          {!isLoggedIn ? 
            <>
              <p className='flex justify-center'>
                Already have an account? Please <Link onClick={
                  ()=>{
                    
                    setIsLoggedIn((value)=> !value)
                    setIsOtpSent(false);

                  }
                  
                }> Login</Link>
              </p>
            </> : 
            <>
              <p className='flex justify-center'>
                Didn't have an account? Please <Link onClick={
                  ()=>{
                    setIsLoggedIn((value)=> !value)
                    setIsOtpSent(true);
                  }
                } > Signin</Link>
              </p>
            </>
          }
          <p className='flex justify-center'>Forgot password? <Link to="/forget-password" >Click Here</Link></p>
        </div>
        {/* <Link to={BASE_URL + "auth/google"}>Log in with google</Link> */}
<div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-400"></div>
  <span className="mx-3 text-gray-400">or</span>
  <div className="flex-grow border-t border-gray-400"></div>
</div>
        <button
  onClick={() => (window.location.href = "http://localhost:5000/auth/google")}
  className="flex items-center justify-center gap-2 w-[90%] mx-auto mt-4 mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition bg-white"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google Logo"
    className="w-5 h-5"
  />
  <span className="text-gray-700 font-medium">Continue with Google</span>
</button>
      </div>
    </div>
  )
}

export default Login