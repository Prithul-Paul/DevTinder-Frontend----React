import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils/constants';

const Requests = () => {

    const [requests, setRequests] = useState([]);
   
    useEffect(() => {
        const fetchRequests = async () => {
            await axios.get(BASE_URL + "user/requests", {
                    withCredentials: true,
            }).then(res => {
                setRequests(res.data.data);
                // return  res.data.data;
                // console.log("Then: ",res.data.data);
            });
        }
        fetchRequests();
        // setConnections(fetchedConnections);
         // runs on route change
        // console.log("Useeffect: ",fetchedConnections);
        // console.log(requests);
    }, []);
    // useEffect(() => {
    //     console.log("Connections updated:", connections);
    // }, [connections]);

    const reviewRequst = async (status, reqId) => {
        await axios.post(BASE_URL + "request/review/" + status + "/" + reqId, {}, {withCredentials: true}).then(res => {
            console.log(res.data);
            if(res.data.status === "success"){
                setRequests(prev => prev.filter(req => req._id !== reqId));
            }
        })
    }

  return (
    <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Connection Requests </h2>
        <div className="space-y-4">
            {console.log(requests)}
            {requests?.length === 0 && (
                <div className="text-center text-gray-500">
                No New Requests are here.
                </div>
            )}
            { requests?.length > 0 && requests.map(con =>(
                <div
                    className="w-[500px] flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm"
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src={BASE_URL + con.formUserId.photoURL}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{con.formUserId.firstName +" "+ con.formUserId.lastName }</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => reviewRequst("accepted", con._id)} className="px-4 py-1 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700">
                            Accept
                        </button>
                        <button onClick={() => reviewRequst("rejected", con._id)} className="px-4 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600">
                            Reject
                        </button>
                    </div>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default Requests