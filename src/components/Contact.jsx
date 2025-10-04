import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const PUBLIC_KEY = import.meta.env.VITE_YOUR_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_YOUR_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_YOUR_TEMPLATE_ID;

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.log("FAILED...", error.text);
          setTimeout(() => setStatus(""), 3000);
        }
      );
  };

  return (
    <section id="contact" className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Contact <span className="text-cyan-400">Me</span>
        </h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 bg-gray-700 rounded-md text-white border-2 border-transparent focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 bg-gray-700 rounded-md text-white border-2 border-transparent focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone (Optional)"
              className="w-full p-3 bg-gray-700 rounded-md text-white border-2 border-transparent focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full p-3 bg-gray-700 rounded-md text-white border-2 border-transparent focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-black font-bold py-3 px-6 rounded-md hover:bg-cyan-400 transition duration-300"
          >
            Send Message
          </button>
          {status && <p className="text-center mt-4 text-white">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
