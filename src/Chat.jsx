import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from './contexts/UserContext';
import { createSocketConnection } from './utils/socket';
import axios from 'axios';
import { BASE_URL } from './utils/constants';

// const crypto = require("crypto");

const Chat = () => {

    const { user } = useUser();
    const currentUserId = user?._id;
    const currentUserName = user?.firstName;
    const {targetUserId} = useParams("targetUserId");
    

    const [newMessage, setnewMessage] = useState("");
    const [message, setMessage] = useState([]);


    const handelSendMessage = ()=>{
        const socket = createSocketConnection();
        socket.emit("sendMessage", {currentUserName, currentUserId, targetUserId, newMessage});
        setnewMessage("");
    }
    const getSavedChat = async ()=> {
        const chat = await axios.get(BASE_URL + "chat/" + targetUserId, {withCredentials: true});
        let savedChats = chat.data.message;
        savedChats = savedChats.map((msg)=>{
            return {currentUserId: msg.senderId, newMessage: msg.textMessage};
        });
        setMessage(savedChats);
    }
    
    useEffect(() => {
        console.log(currentUserName);
        const socket = createSocketConnection();
        // console.log(getUniqueRoomId());
        socket.emit("joinChat", {currentUserName, currentUserId, targetUserId});
        getSavedChat();
        socket.on("messageRecieved", ({currentUserId, currentUserName, newMessage})=>{ 
            // message = {currentUserId, newMessage};
            setMessage((prev) => [...prev, {currentUserId, newMessage}]);
            console.log(currentUserId + " Sent : " + newMessage);
            console.log(message);
        });
        

        return ()=>{
            socket.disconnect();
        };
    }, []);



    return (
        <div className="w-full max-w-4xl h-110 bg-gray-800 rounded-xl shadow-lg mx-auto p-4 flex flex-col mt-10 mb-10">
            {/* Chat history */}
            <div className="flex-1 overflow-y-auto space-y-4">
                {message.map((msg, index) => {
                    return msg.currentUserId === currentUserId ? (
                        <div key={index} className="chat chat-end">
                        <div className="chat-bubble chat-bubble-success text-white">
                            {msg.newMessage}
                        </div>
                        </div>
                    ) : (
                        <div key={index} className="chat chat-start">
                        <div className="chat-bubble chat-bubble-neutral text-white">
                            {msg.newMessage}
                        </div>
                        </div>
                    );
                })}


                {/* <div className="chat ">
                    <div className="chat-bubble chat-bubble-success text-white">
                        You underestimate my power!
                    </div>
                </div> */}
            </div>

            {/* Input row */}
            <div className="mt-4 flex">
                <input
                type="text" value={newMessage}
                onChange={(e)=>setnewMessage(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 input input-bordered bg-gray-700 text-white"
                />
                <button onClick={handelSendMessage} className="ml-2 btn btn-primary">
                Send
                </button>
            </div>
        </div>
    )
}

export default Chat