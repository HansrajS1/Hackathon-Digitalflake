import React from 'react';
import { motion } from 'framer-motion';
import profilePic2 from '../assets/images/profile2.jpg';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center bg-black text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        <motion.div 
          className="md:w-1/3 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05, rotate: 3 }} 
        >
          <img 
            src={profilePic2} 
            alt="Hans Raj" 
            className="rounded-full cursor-pointer w-72 h-72 md:w-96 md:h-96 object-cover shadow-2xl shadow-cyan-500/40 transition-shadow duration-300 hover:shadow-cyan-400/60"
          />
        </motion.div>

        <motion.div 
          className="md:w-2/3 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-4">About <span className="text-cyan-400">Me</span></h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm a passionate B.Tech student at Alliance University, majoring in Computer Science with a specialization in AI & ML, set to graduate in 2026. I thrive on using technology to solve real-world problems and have hands-on experience with C, C++, Python, and Java.
          </p>
          <br/>
          <p className="text-lg text-gray-300 leading-relaxed">
            I've developed projects ranging from a cardiovascular risk prediction system to a GPT-4 powered restaurant menu generator. I'm actively seeking internship or project opportunities where I can contribute my skills, learn from experienced professionals, and tackle new challenges.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;