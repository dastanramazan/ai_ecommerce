import React, { useState } from 'react'
import './CSS/Login.css'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setError("");
    try {
      const resp = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await resp.json();
      if (!data.success) {
        setError(data.errors || "Login failed");
        return;
      }
      if (!data.isAdmin) {
        setError("This account does not have admin access.");
        return;
      }
      localStorage.setItem('auth-token', data.token);
      onLogin();
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Admin Login</h1>
        <div className="login-fields">
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} onKeyDown={(e) => { if (e.key === 'Enter') login(); }} />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login
