import React, { useEffect, useRef } from 'react'

const Chathistory = ({message, currentUserId}) => {
  const bottomRef = useRef(null);
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  })

  return (
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
        <div ref={bottomRef} />
    </div>
    

  )
}

export default Chathistory