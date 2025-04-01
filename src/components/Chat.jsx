import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store=> store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.post(BASE_URL + "/chat/" + targetUserId, {}, {withCredentials: true})

        const chatMessages = chat?.data?.messages.map((msg)=> {
            const { senderId, text } = msg;
            return { firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text: text,
            }
        });
        setMessages(chatMessages);
    }
    useEffect(()=> {
        fetchChatMessages();
    }, []);
    useEffect(()=> {
        if(!userId) return;
        const socket = createSocketConnection();
        // use socket to emit events
        // as soon as page loads, scoket connection is made, the join chat event is emitted
        socket.emit("joinChat", {firtsName: user.firstName, userId, targetUserId});

        // listen for messages
        socket.on("messageReceived", ({firstName, lastName, text}) => {
            setMessages((messages) => [...messages, {firstName, lastName, text}])
        })

        // return method called when component unmounts i.e. unloads, i.e . user moves to some other page
        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        try {
            const socket = createSocketConnection();
            socket.emit("sendMessage", {
                firstName:user.firstName,
                lastName: user.lastName,
                userId, targetUserId,
                text: newMessage});
            setNewMessage("");
        }
        catch(err) {
            console.log(err?.message);
        }
    }
  return (
    <div className="m-3/4 mx-auto border border-gray-600 p-5 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat with {targetUserId}</h1>
        <div className="flex-1 overflow-scroll p-5">
            {messages && messages.map((msg, index) => {
                return <div key={index}>
                    <div className={"chat " + (msg?.firstName === user?.firstName ? "chat-end" : "chat-start")}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <div className="chat-header">
                            {`${msg.firstName} ${msg.lastName}`}
                            <time className="text-xs opacity-50">12:45</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                </div>
            })}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center">
            <input type="text" value={newMessage} placeholder="Type a message" 
            className="flex-1 border border-gray-500 text-white rounded-2xl"
            onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={sendMessage} className="btn btn-secondary">Send</button>
        </div>
    </div>
  )
}

export default Chat