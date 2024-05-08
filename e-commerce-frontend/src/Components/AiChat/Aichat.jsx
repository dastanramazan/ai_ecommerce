
import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import './Aichat.css'

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyD-oa1o7w2ZeTFw38PAC-Lcu23GphLV8OU"; //  API key

function Aichat() {
  const [conversation, setConversation] = useState([]);
  const userInputRef = useRef(null);
  const conversationContainerRef = useRef(null); // New ref for conversation container

  const generateResponse = async () => {
    

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
        const generationConfig = {
          temperature: 1,
          topK: 0,
          topP: 0.95,
          maxOutputTokens: 8192,
        };
    
        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];
    
        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [
            {
              role: "user",
              parts: [{ text: "Hi"}],
            },
            {
              role: "model",
              parts: [{ text: "Hello there! Welcome to the Car Parts Shop Help Chat. I'm Car Parts Helper, here to assist you with finding the right parts for your vehicle.\n\nBefore we begin, may I kindly ask for your name and email address? This will help me provide you with a more personalized experience and follow up if needed."}],
            },
            {
              role: "user",
              parts: [{ text: "Name Dastan email dastan@gmail.com"}],
            },
            {
              role: "model",
              parts: [{ text: "Thank you, Dastan. It's a pleasure to assist you today. \n\nHow can I help you with your car parts needs?  Are you looking for something specific or need some guidance?"}],
            },
            {
              role: "user",
              parts: [{ text: "Looking for oil filter"}],
            },
            {
              role: "model",
              parts: [{ text: "Certainly, Dastan! Let's find the perfect oil filter for your vehicle. To ensure we get the right one, could you please provide me with the following information:\n\n* **Year, make, and model of your car:** This will help us narrow down the options to filters that are compatible with your specific vehicle.\n* **Engine size and type (if known):**  Knowing the engine specifics further refines the search to filters with the correct specifications. \n* **Desired brand or price range (optional):** If you have a preferred brand or a specific budget in mind, let me know and I can tailor the recommendations accordingly. \n\nThe more information you can provide, the better I can assist you in finding the ideal oil filter for your car."}],
            },
            {
              role: "user",
              parts: [{ text: "Ok thanks"}],
            },
            {
              role: "model",
              parts: [{ text: "You're most welcome, Dastan! I'm here to help. Just let me know the details of your car and any preferences you have for the oil filter, and we'll find the perfect match."}],
            },
            {
              role: "user",
              parts: [{ text: "Break pads?"}],
            },
            {
              role: "model",
              parts: [{ text: "Absolutely, Dastan! We can definitely help you find the right brake pads for your car. To ensure we get the perfect fit, could you please share the following information:\n\n* **Year, make, and model of your car:**"}],
            },
            {
              role: "user",
              parts: [{ text: "Do you offer any discounts or coupons?"}],
            },
            {
              role: "model",
              parts: [{ text: "Great question, Dastan! We frequently run promotions and offer discounts on various car parts, including oil filters and brake pads."}],
            },
            {
              role: "user",
              parts: [{ text: "What are your return and exchange policies?"}],
            },
            {
              role: "model",
              parts: [{ text: "## Return and Exchange Policies:\n\nWe want you to be completely satisfied with your purchase. Here's a summary of our return and exchange policies:\n\n**Returns:**\n\n* **Timeframe:** Most new, unopened items can be returned within **30 days of purchase** for a full refund. \n* **Condition:** Items must be in their original packaging, unused, and in the same condition as received.\n* **Exceptions:** Certain items, such as electrical parts, may be non-returnable or subject to a restocking fee. \n\n**Exchanges:**\n\n* We gladly facilitate exchanges for items in new, unopened condition within the 30-day return window.\n* If you need a different size, type, or model, we'll help you find the right replacement.\n\n**Process:**\n\n* To initiate a return or exchange, please bring the item and your receipt to our store. \n* Our team will guide you through the process and ensure a smooth experience. \n\n**Additional Notes:**\n\n* It's recommended to check the specific return policy for the item you purchased, as some exceptions may apply. \n* We strive to process returns and exchanges promptly, and refunds are typically issued within a few business days.\n\n**Please note:**  This is a general overview, and specific details may vary. For the most accurate information regarding returns and exchanges, please refer to the policies outlined on your receipt or contact our store directly."}],
            },
            {
              role: "user",
              parts: [{ text: "How long will it take for my order to arrive?"}],
            },
            {
              role: "model",
              parts: [{ text: "The delivery time for your order depends on several factors, including:\n\n* **Shipping method:** We offer various shipping options, including standard, expedited, and overnight. Faster shipping methods will naturally result in quicker delivery times. \n* **Availability of the items:** If all items are in stock, your order will typically ship within 1-2 business days. \n* **Destination:** Delivery times vary depending on the distance between our warehouse and your shipping address. \n\nTo provide you with a more accurate estimate, I'd need some additional information:\n\n* **The specific items you ordered:** Knowing the items helps determine if they're in stock and their shipping size/weight.\n* **Your shipping address (city and state):** This allows me to estimate the distance and transit time.\n* **The chosen shipping method:**  Knowing your preferred shipping speed helps calculate the expected delivery timeframe. \n\nWith this information, I can provide you with a more precise estimate of when your order will arrive."}],
            },
      ],
    });

    const userInput = userInputRef.current.value;
    if (!userInput) return;
   
    const newMessage = { role: "user", text: userInput };
    setConversation((prevConversation) => [...prevConversation, newMessage]); // Functional update
  
    const result = await chat.sendMessage(userInput);
    const response = result.response;
  
    const modelResponse = { role: "model", text: response.text() };
    setConversation((prevConversation) => [...prevConversation, modelResponse]);
  
    userInputRef.current.value = "";

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

