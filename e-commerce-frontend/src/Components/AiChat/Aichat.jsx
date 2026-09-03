
import React, { useState, useRef } from 'react';
import './Aichat.css'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

function Aichat() {
  const [conversation, setConversation] = useState([]);
  const userInputRef = useRef(null);
  const conversationContainerRef = useRef(null); // New ref for conversation container

  const generateResponse = async () => {
    const userInput = userInputRef.current.value;
    if (!userInput) return;

    const newMessage = { role: "user", text: userInput };
    setConversation((prevConversation) => [...prevConversation, newMessage]); // Functional update
    userInputRef.current.value = "";

    try {
      const resp = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await resp.json();
      const modelResponse = { role: "model", text: data.text || data.error || "Sorry, I couldn't process that." };
      setConversation((prevConversation) => [...prevConversation, modelResponse]);
    } catch (error) {
      console.error("Chat error:", error);
      setConversation((prevConversation) => [...prevConversation, { role: "model", text: "Sorry, something went wrong. Please try again." }]);
    }

    // Scroll conversation to bottom
    conversationContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <h1>Car Parts AI Helper</h1>
      <div className="conversation" ref={conversationContainerRef}> {/* Add ref to container */}
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input className="input_message" type="text" ref={userInputRef} placeholder="Type your message..." />
      <button className='aichat_button' onClick={generateResponse}>Send</button>
    </div>
  );
}

export default Aichat;
