import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const navLinks = ["Home", "About", "Skills", "Education", "Projects", "Contact"];

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header className="hidden md:flex fixed top-4 left-0 right-0 z-50 flex justify-center">
      <nav className="w-11/12 md:w-3/4 lg:w-1/2 bg-white/20 backdrop-blur-md rounded-full flex justify-between items-center p-3 text-white shadow-lg">
        <a href="#home" className="text-xl font-bold ml-4">HANS RAJ</a>
        
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="hover:text-cyan-300 transition-colors duration-300">{link}</a>
            </li>
          ))}
        </ul>

        <div onClick={handleNav} className="block md:hidden mr-4 cursor-pointer">
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[70%] h-full border-r border-r-gray-800 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%] ease-in-out duration-500'}>
          <h1 className="w-full text-3xl font-bold text-cyan-400 m-8">HANS RAJ</h1>
          <ul className="uppercase p-4">
            {navLinks.map(link => (
              <li key={link} className="p-4 border-b border-gray-600">
                <a href={`#${link.toLowerCase()}`} onClick={() => setNav(false)}>{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;