import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // FETCH: Get posts from your NestJS Backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/guestbook');
      setPosts(res.data);
    } catch (err) {
      console.error("Make sure your Backend is running on port 3000!", err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // INSERT: Send a new message to the Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/guestbook', { name, message });
      setName(''); 
      setMessage('');
      fetchPosts(); // Refresh the list
    } catch (err) {
      alert("Error: Check if the Backend is running!");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
      <h1>Guestbook Activity</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit" style={{ cursor: 'pointer', padding: '10px' }}>Post Message</button>
      </form>
      <hr style={{ margin: '20px 0' }} />
      <h2>Messages</h2>
      {posts.map((p) => (
        <div key={p.id} style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <strong>{p.name}</strong>
          <p>{p.message}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

// Final Submission