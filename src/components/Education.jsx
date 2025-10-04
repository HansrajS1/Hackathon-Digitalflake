import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import logo1 from '../assets/images/alliance.png';
import logo2 from '../assets/images/VVS.png';
import educationBgImage from "../assets/images/background1.jpg"; 


const educationData = [
  {
    institution: "Alliance College of Engineering and Design",
    degree: "Bachelor Of Engineering In Computer Science",
    period: "2022 - 2026 | Pursuing",
    logo: logo1
  },
  {
    institution: "Valley View School",
    degree: "Senior Secondary Education | CBSE",
    period: "2022 | Completed",
    logo: logo2
  }
];

const EducationCard = ({ edu }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    const rotateX = (y / card.height) * -30;
    const rotateY = (x / card.width) * 30;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
    >
      <motion.div
        className="flex-shrink-0 h-48 overflow-hidden"
        style={{ transform: 'translateZ(40px)' }} 
      >
        <img 
          src={edu.logo} 
          alt={edu.institution} 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div 
        className="flex-grow p-6 text-center"
        style={{ transform: 'translateZ(20px)' }}
      >
        <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
        <p className="text-cyan-300 mt-1">{edu.degree}</p>
        <p className="text-gray-400 mt-2">{edu.period}</p>
      </motion.div>
    </motion.div>
  );
};


const Education = () => {
  return (
    <section 
      id="education" 
      className="py-20 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${educationBgImage})` }}
    >
      <div className="container mx-auto px-4 bg-black/60 backdrop-blur-sm py-10 rounded-xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">My <span className="text-cyan-400">Education</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationCard key={index} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;