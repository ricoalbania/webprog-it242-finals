import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // This connects the design we just made

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // IMPORTANT: Change this URL to your live Backend URL once deployed.
  // For now, it defaults to localhost for your local testing.
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/guestbook';

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      console.error("Backend connection failed.", err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { name, message });
      setName(''); 
      setMessage('');
      fetchPosts(); 
    } catch (err) {
      alert("Submission failed. Is the backend live?");
    }
  };

  return (
    <div className="container">
      <h1>Guestbook Activity</h1>
      
      <form onSubmit={handleSubmit} className="form-section">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Your Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
          rows="3"
        />
        <button type="submit">Post Message</button>
      </form>

      <div className="message-list">
        <h2>Messages</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>No messages yet. Be the first!</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="message-card">
              <h4>{p.name}</h4>
              <p>{p.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;