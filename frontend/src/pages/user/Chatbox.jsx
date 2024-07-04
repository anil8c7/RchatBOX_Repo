import React from 'react'
import "./chatbox.css"
function Chatbox() {
  return (
<>
    <div class="chat-container">
        <div class="chat-header">
            <h2>Chat Room</h2>
        </div>
        <div class="chat-messages" id="chat-messages">
        </div>
        <div class="chat-input">
            <input type="text" id="message-input" placeholder="Type your message..."/>
            <button onclick="sendMessage()">Send</button>
        </div>
    </div>
</>  
);
}

export default Chatbox