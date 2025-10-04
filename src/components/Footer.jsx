import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/HansrajS1" target="_blank" aria-label="View GitHub Profile" className="text-3xl hover:text-cyan-400 transition duration-300"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/hansrajvvs" target="_blank" aria-label="View LinkedIn Profile" className="text-3xl hover:text-cyan-400 transition duration-300"><FaLinkedin /></a>
          <a href="https://www.instagram.com/hansrajvvs_0" target="_blank" aria-label="View Instagram Profile" className="text-3xl hover:text-cyan-400 transition duration-300"><FaInstagram /></a>
          <a href="https://wa.me/+919801486494" target="_blank" aria-label="View WhatsApp Profile" className="text-3xl hover:text-cyan-400 transition duration-300"><FaWhatsapp /></a>
          <a href="mailto:hansrajvvs@gmail.com" target="_blank" aria-label="View Email Profile" className="text-3xl hover:text-cyan-400 transition duration-300"><FaEnvelope /></a>
        </div>
        <p>Email: <a href="mailto:hansrajvvs@gmail.com" className="hover:text-cyan-400">hansrajvvs@gmail.com</a></p>
        <p className="mt-4 text-gray-400">
          © {new Date().getFullYear()} HANS RAJ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;