import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
    const [chatList, setChatList] = useState([]);
    const [targetUserDetails, setTargetUserDetails] = useState({});


    const handelSendMessage = ()=>{
        const socket = createSocketConnection();
        socket.emit("sendMessage", {currentUserName, currentUserId, targetUserId, newMessage});
        setnewMessage("");
    }
    const getSavedChat = async ()=> {
        const {data} = await axios.get(BASE_URL + "chat/" + targetUserId, {withCredentials: true});
        const {chat, userDetilas} = data;
        setTargetUserDetails(userDetilas);
        console.log(chat);
        // return;
        let savedChats = chat.message;
        savedChats = savedChats.map((msg)=>{
            return {currentUserId: msg.senderId, newMessage: msg.textMessage};
        });
        setMessage(savedChats);
    }
    
    const fetchChatList = async () => {
        const chats = await axios.get(BASE_URL + "chatlist", {withCredentials: true});
        // console.log(chats);
        setChatList(chats.data);
    }

    useEffect(() => {
        console.log(currentUserName);
        console.log(targetUserId);
        fetchChatList();
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
    }, [targetUserId]);



    return (
        <>
            <div className="flex h-screen bg-slate-950 text-slate-200">

            {/* ===== Chat List ===== */}
                <div className="w-80 border-r border-slate-800 p-4 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Chats</h2>

                    {chatList?.length === 0 && (
                        <div className="text-center text-gray-500">
                            You have no chats.
                        </div>
                    )}

                    {chatList?.length > 0 && chatList.map((chat)=>{
                        const senderName = chat?.textedTo?.firstName + " " + chat?.textedTo?.lastName;
                        const lastText = chat?.lastmsg?.textMessage;
                        return (
                            <div key={chat.id} className="flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer hover:bg-slate-900 border border-slate-800">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center"><img src={BASE_URL + chat.textedTo.photoURL}/></div>
                                <Link to={"/message/"+ chat?.textedTo?._id} ><div>
                                    <p className="font-medium">{chat?.textedTo?.firstName + " " + chat?.textedTo?.lastName}</p>
                                    <p className="text-sm text-slate-400 truncate">
                                    { lastText.slice(0, 30) }{lastText.length > 30 && ("...")}
                                    </p>
                                </div></Link>
                            </div>
                        );
                    })}
                </div>

            {/* ===== Chat Box ===== */}
                <div className="flex-1 flex flex-col">

                    {/* Chat Header */}
                    <div className="h-14 border-b border-slate-800 flex items-center px-4 font-semibold">
                    {targetUserDetails?.firstName}
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
                    {message.map((msg, index) =>
                        msg.currentUserId === currentUserId ? (
                        <div key={index} className="flex justify-end">
                            <div className="bg-green-600 text-white px-4 py-2 rounded-lg max-w-xs">
                            {msg.newMessage}
                            </div>
                        </div>
                        ) : (
                        <div key={index} className="flex justify-start">
                            <div className="bg-slate-700 text-white px-4 py-2 rounded-lg max-w-xs">
                            {msg.newMessage}
                            </div>
                        </div>
                        )
                    )}
                    </div>

                    {/* Input Row */}
                    <div className="p-4 border-t border-slate-800 flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setnewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg bg-slate-800 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handelSendMessage}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat