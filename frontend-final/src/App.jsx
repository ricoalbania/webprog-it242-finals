import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Visual feedback
    try {
      await axios.post(API_URL, { name, message });
      setName(''); 
      setMessage('');
      await fetchPosts(); 
    } catch (err) {
      alert("Submission failed. Is the backend live?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header-animate">
        <h1>Rico's Finals Guestbook</h1>
        <p className="subtitle">Leave a mark on my project!</p>
      </header>
      
      <form onSubmit={handleSubmit} className="form-section">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="What's your name?" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <textarea 
            placeholder="Write a friendly message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
            rows="3"
          />
        </div>
        <button type="submit" className={loading ? 'loading' : ''} disabled={loading}>
          {loading ? 'Sending...' : 'Post Message ✨'}
        </button>
      </form>

      <div className="message-list">
        <h2>Recent Activity ({posts.length})</h2>
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Be the first to say hi! 👋</p>
          </div>
        ) : (
          posts.map((p, index) => (
            <div key={p.id} className="message-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header">
                <h4>{p.name}</h4>
                <span className="timestamp">Just now</span>
              </div>
              <p>{p.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;