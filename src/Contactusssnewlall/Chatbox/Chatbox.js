import React, { useState } from "react";
import "./Chatbox.css"; 
import { RiCloseLargeFill } from "react-icons/ri";

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(true); // To track if the chatbox is open or not
  
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can we assist you today?" },
    ]);
    const [userMessage, setUserMessage] = useState("");

    const handleSend = () => {
        if (userMessage.trim() !== "") {
            setMessages([...messages, { sender: "user", text: userMessage }]);
            setUserMessage(""); // Clear input field
        }
    };

    const closeChatbox = () => {
        setIsOpen(false); // Set chatbox visibility to false when close icon is clicked
    };

    // Only render the chatbox if isOpen is true
    return (
        isOpen && (
            <div className="chatbox-container">
                <div className="chatbox-header">
                    Chat with Us 
                    <RiCloseLargeFill className="closeicon" onClick={closeChatbox} />
                </div>
                <div className="chatbox-body">
                    <div className="chatbox-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chatbox-message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbox-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ChatBox;
