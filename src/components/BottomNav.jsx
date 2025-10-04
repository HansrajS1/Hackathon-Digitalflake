import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineCode, AiOutlineMail, AiOutlineProject } from 'react-icons/ai';
import { PiCertificate } from 'react-icons/pi';
import { IoSchoolOutline } from 'react-icons/io5';


const BottomNav = () => {
  
  const [activeNav, setActiveNav] = useState('#home');

  const navLinks = [
    { href: '#home', text: 'Home', icon: <AiOutlineHome /> },
    { href: '#about', text: 'About', icon: <AiOutlineUser /> },
    { href: '#skills', text: 'Skills', icon: <AiOutlineCode /> },
    { href: '#projects', text: 'Projects', icon: <AiOutlineProject /> },
    { href: '#contact', text: 'Contact', icon: <AiOutlineMail /> },
  ];

  return (
    
    <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-gray-900/80 backdrop-blur-lg rounded-full shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActiveNav(link.href)}
            
            className={`flex flex-col items-center justify-center text-xs transition-all duration-300 w-16 h-12 rounded-full
              ${activeNav === link.href
                ? 'bg-cyan-400  text-black scale-110'
                : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="mt-1">{link.text}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;