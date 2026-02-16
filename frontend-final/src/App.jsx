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
      console.error("Connection failed.", err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, { name, message });
      setName(''); 
      setMessage('');
      await fetchPosts(); 
    } catch (err) {
      alert("Submission failed. Is the forest path clear?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <header className="nature-header">
      <h1>Guestbook</h1>
      <p className="subtitle">Leave a message for me 🌿</p>
    </header>
      
      <form onSubmit={handleSubmit} className="form-section">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Write a message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
          rows="3"
        />
        <button type="submit" className={loading ? 'loading' : ''} disabled={loading}>
          {loading ? 'Planting...' : 'Share Message 🍃'}
        </button>
      </form>

      <div className="message-list">
        <h2>Recent Messages ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="empty">The forest is quiet... be the first to speak! 🍄</p>
        ) : (
          posts.map((p, index) => (
            <div key={p.id} className="message-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header">
                <h4>{p.name}</h4>
                <span className="timestamp">Gathered recently</span>
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