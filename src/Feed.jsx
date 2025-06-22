import React, { useEffect, useState } from 'react'
import FeedCard from './FeedCard'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useLocation } from 'react-router-dom'

const Feed = () => {

  // const location = useLocation();
  const [feed, setFeed] = useState([]);
  const [firstUser, setFisrtuser] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const userFeed = async () => {
      try {
        await axios.get(BASE_URL + "user/feed",{ withCredentials: true }).then((res)=> {
          setFeed(res.data.data);
          setFisrtuser(res.data.data[0]);
        });
        
        // console.log(res.data.data[0]);
  
      } catch (error) {
        console.error(error.message);
      }
    }
    userFeed();
  }, []);

  const sendRequst = async (status, userId) => {
    try{
      await axios.post(BASE_URL + "request/send/" + status + "/" + userId, {}, {
        withCredentials: true
      }).then(res => {
        if(res.data.status === "success"){
          setError(res.data.message);
          setTimeout(i => {
            setError(null);
          },2000)
          const updatedFeed = feed.filter(req => req._id !== userId);
          setFeed(updatedFeed);
          setFisrtuser(updatedFeed[0]);

          // setFeed((prev) => {
          //   const updatedFeed = prev.filter(req => req._id !== userId);
          //   setFisrtuser(updatedFeed[0]);
          // });
        }
      })

    }catch(err){
      console.log(err.message);
      
    }
  }


  return (
    <div className='flex justify-center my-8'>
      { feed && (
          // <FeedCard data={firstUser} />
          
          <div className="card bg-base-300 w-90 shadow-sm">
            
              <figure>
                <img
                  src={firstUser.photoURL}
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {firstUser.firstName + " " + firstUser.lastName}
                  {firstUser?.age && <div className="badge badge-secondary">{firstUser?.age}</div>}
                </h2>
                <p>{firstUser?.about}</p>
                  { firstUser?.skills?.length > 0 && (
                      <div className="card-actions justify-end">Skills: 
                          {firstUser.skills.map((skill) => (
                              <div className="badge badge-outline">{skill}</div>
                              // <div className="badge badge-outline">Products</div>
                          ))}
                      </div>
                  )}
                  <div className="card-actions flex justify-center my-2">
                      <button className="btn btn-error" onClick={()=>sendRequst("ignored", firstUser._id)}>Ignore</button>
                      <button className="btn btn-primary" onClick={()=>sendRequst("interested", firstUser._id)}>Interested</button>
                  </div>
              </div>
          </div> 
          
      )}
      {error && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Feed