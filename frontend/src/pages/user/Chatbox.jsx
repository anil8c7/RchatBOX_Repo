// Chatbox.jsx
import { React, useState } from 'react';
import "./chatbox.css";
import ChatBoxSidebar from './chatBoxSidebar';
import { createChats } from '../../Services/authService';

function Chatbox() {
    const [formData, setFormData] = useState({
        friendId: "",
        userId: ""
    });
    const handleCreateChat = async (friendId, userId) => {                
        setFormData({
            friendId: friendId,
            userId: userId
        });
        const response = await createChats(formData);
        console.log(response);
        
        if(response.status===201){
            console.log('created');
        }else{
            console.log('not Created');
        }
    };

    return (
        <>
            <div className="container">
                <ChatBoxSidebar handleCreateChat={handleCreateChat} /> 
                <div className="chat-box">
                    <div className="chat-header">
                        <p>Chat with User 1</p>
                    </div>
                    <div className="chat-messages">
                        <div className="message received">
                            <p>Hello!</p>
                        </div>
                        <div className="message sent">
                            <p>Hi there!</p>
                        </div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message" />
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chatbox;
