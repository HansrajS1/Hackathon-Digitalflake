import React from 'react';
import { motion } from 'framer-motion';

import oracleBadge from '../assets/images/oracle-genai-badge.png';
import metaBadge from '../assets/images/meta-frontend-badge.png';
import coursera from '../assets/images/coursera.png';

const certifications = [
  {
    name: 'Oracle Certified Professional: OCI Generative AI',
    issuer: 'Oracle',
    imageUrl: oracleBadge,
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=2E3CF10DA3067B573576476673C7DC3639DA46F930255DA23726CB3E2CD919D6' 
  },
  {
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    imageUrl: metaBadge,
    link: 'https://www.credly.com/earner/earned/badge/0e1aa503-ff73-4538-92fa-cc7716c51474'
  },
  {
    name: ' Coursera Certificate',
    issuer: 'Coursera',
    imageUrl: coursera,
    link: 'https://www.coursera.org/learner/hansraj' 
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Certifications & <span className="text-cyan-400">Achievements</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -15, scale: 1.05, rotateX: 10 }}
            >
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={`Verify: ${cert.name}`}
                className="block"
              >
                <img 
                  src={cert.imageUrl} 
                  alt={`${cert.issuer} - ${cert.name}`} 
                  className="max-h-52 md:max-h-64 rounded-lg shadow-lg transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/50"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;