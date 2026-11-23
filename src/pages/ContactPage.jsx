
import { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.target.reset();
  }

  return (
    <section className="contact-page">
      <div className="contact-heading">
        <p>WE ARE HERE TO HELP</p>
        <h1>Contact Us</h1>
        <span>Have a question? We'd love to hear from you.</span>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Our team is here to help with your shopping experience.</p>

          <h3>Email</h3>
          <p>support@luxefashion.com</p>

          <h3>Customer Support</h3>
          <p>Monday - Saturday</p>
          <p>9:00 AM - 6:00 PM</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Subject</label>
          <input type="text" placeholder="Enter subject" required />

          <label>Your Message</label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            required
          />

          <button type="submit">SEND MESSAGE</button>

          {submitted && (
            <p className="contact-success">
              Thank you! Your message was submitted in this demo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
