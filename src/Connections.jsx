import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils/constants';
import { Link } from 'react-router-dom';

const Connections = () => {
    const [connections, setConnections] = useState([]);
   
    useEffect(() => {
        const fetchConnections = async () => {
            await axios.get(BASE_URL + "user/connection", {
                    withCredentials: true,
            }).then(res => {
                setConnections(res.data.data);
                // return  res.data.data;
                // console.log("Then: ",res.data.data);
            });
        }
        fetchConnections();
        // setConnections(fetchedConnections);
         // runs on route change
        // console.log("Useeffect: ",fetchedConnections);
        // console.log(connections);
    }, []);
    // useEffect(() => {
    //     console.log("Connections updated:", connections);
    // }, [connections]);
  return (
    <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Your Friends </h2>
        <div className="space-y-4">
            {connections?.length === 0 && (
                <div className="text-center text-gray-500">
                No New Connections are here.
                </div>
            )}
            { connections?.length > 0 && connections.map(con =>(
                <div key={con._id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm"
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src={BASE_URL + con.photoURL}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{con.firstName +" "+ con.lastName }</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                        </div>
                    </div>
                    <Link to={"/message/"+ con._id} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600">
                    Message
                    </Link>
                </div>
            ))}
            
        </div>
    </div>

  )
}

export default Connections