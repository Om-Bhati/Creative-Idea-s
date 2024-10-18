import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [textAreaHeight] = useState('auto');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      history.push('/');
    });
  };

  const handleInputChange = (e) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  }, [body]); // This effect runs every time the body content changes

  return (
    <div className="create">
      <h2>Add a New Idea</h2>
      <form onSubmit={handleSubmit}>
        <label>Idea's title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Write your Idea:</label>
        <textarea
          required
          value={body}
          onChange={handleInputChange}
          style={{ height: textAreaHeight, overflow: 'hidden' }}
        ></textarea>
        <label>Your name:</label>
        <input 
          type="text" 
          required 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button>Add Idea</button>
      </form>
    </div>
  );
}

export default Create;