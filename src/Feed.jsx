import React, { useEffect, useState } from 'react'
import FeedCard from './FeedCard'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useLocation } from 'react-router-dom'

const Feed = () => {

  const location = useLocation();
  const [feed, setFeed] = useState([]);
  const userFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/feed",{ withCredentials: true });
      setFeed(res.data.data[0]);
      // console.log(res.data.data[0]);

    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    userFeed();
  }, []);
  return (
    <div className='flex justify-center my-8'>
      <FeedCard data={feed} />
    </div>
  )
}

export default Feed