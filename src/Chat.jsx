import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from './contexts/UserContext';
import { createSocketConnection } from './utils/socket';

const Chat = () => {

    const { user } = useUser();
    const currentUserId = user?._id;
    // console.log(currentUserId);
    const targetUserId = useParams("targetUserId");
    useEffect(() => {
        const socket = createSocketConnection();
        socket.emit("joinChat", {currentUserId, targetUserId});

        return ()=>{
            socket.disconnect();
        };
        
    }, []);

    return (
        <div className="w-full max-w-4xl h-96 bg-gray-800 rounded-xl shadow-lg p-4 mx-auto p-4 flex flex-col mt-10">
            {/* Chat history */}
            <div className="flex-1 overflow-y-auto space-y-4">
                <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-neutral text-white">
                    It's over Anakin,<br />I have the high ground.
                </div>
                </div>

                <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-success text-white">
                    You underestimate my power!
                </div>
                </div>
            </div>

            {/* Input row */}
            <div className="mt-4 flex">
                <input
                type="text"
                placeholder="Type your message…"
                className="flex-1 input input-bordered bg-gray-700 text-white"
                />
                <button className="ml-2 btn btn-primary">
                Send
                </button>
            </div>
        </div>
    )
}

export default Chat