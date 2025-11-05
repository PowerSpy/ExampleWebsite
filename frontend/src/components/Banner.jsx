import { useState, useEffect } from 'react';
import './Banner.css';

function Banner() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="banner">
      <div className="banner-content">
        {messages.map(message => (
          <div key={message.id} className="banner-message">
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;