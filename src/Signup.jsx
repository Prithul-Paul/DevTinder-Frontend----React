import React, { useEffect, useRef, useState } from 'react';
import "cally";
import { useUser } from './contexts/UserContext';
import NavBar from './NavBar';
import axios from 'axios';
import Footer from './Footer';

const Signup = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const today = new Date().toISOString().split('T')[0];

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    // const [age, setAge] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // const { setUser } = useUser();


    const handelSignup = async () => {
        try{
            const res = await axios.post(BASE_URL + "signup", {
                firstName,
                lastName,
                emailId,
                password
            },
            {withCredentials: true});

            // setUser(res.data.data);
            // setError(apiMessage);
            return navigate("/profile"); 

        }catch(err){
            console.log("ERROR : "+err.message);
            // if (err.response?.status === 401) {
            //     const apiMessage = err.response.data?.error || "Something went worng!!!"; // 👈 read message from API
            //     setError(apiMessage);
            // }
        }
    }
    handelSignup();
  return (
    <div>
        <NavBar/>
        <div className='flex justify-center my-10'>
        <div className="card bg-neutral text-primary-content w-96 ">
            <div className="card-body">
            <h2 className="card-title flex justify-center text-2xl">Signup</h2>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" value={firstName} className="input" placeholder="Type First Name" onChange={(e)=>setFirstname(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" value={lastName} className="input" placeholder="Type Last Name" onChange={(e)=>setLastname(e.target.value)} />
            </fieldset>
            {/* <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input type="text" value={age} className="input" placeholder="Type age" onChange={(e)=>setAge(e.target.value)} />
            </fieldset> */}
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
                <button className="btn btn-lg btn-info" onClick={handelSignup}>Signup</button>
            </div>
            </div>
        </div>
        </div>
        <Footer/>

    </div>
  )
}

export default Signup