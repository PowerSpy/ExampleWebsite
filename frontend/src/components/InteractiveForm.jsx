import { useState } from 'react';
import './InteractiveForm.css';

function InteractiveForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    preference: 'email',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="form-container">
      <h2>Contact Form</h2>
      {submitted ? (
        <div className="success-message">Thank you for your submission!</div>
      ) : (
        <form onSubmit={handleSubmit} className="interactive-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contact Preference:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="email"
                  checked={formData.preference === 'email'}
                  onChange={handleChange}
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="phone"
                  checked={formData.preference === 'phone'}
                  onChange={handleChange}
                />
                Phone
              </label>
            </div>
          </div>
          
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default InteractiveForm;