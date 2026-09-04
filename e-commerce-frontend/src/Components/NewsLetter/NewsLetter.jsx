import React, { useState } from 'react'
import './NewsLetter.css'
import FadeIn from '../FadeIn/FadeIn'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const resp = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await resp.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.alreadySubscribed ? "You're already on the list!" : 'Subscribed! Watch your inbox for offers.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.errors || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Could not reach the server. Please try again.');
    }
  };

  return (
    <FadeIn className='news_letter'>
      <h1>Get Exclusive Offers on Email</h1>
      <p>Subscribe and stay updated.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
        </button>
      </form>
      {message && (
        <p className={`news_letter_message ${status === 'error' ? 'news_letter_message_error' : ''}`}>
          {message}
        </p>
      )}
    </FadeIn>
  )
}

export default NewsLetter
