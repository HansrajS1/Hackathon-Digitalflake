import React from "react";
import { motion } from "framer-motion";
import skill1 from "../assets/images/html.png";
import skill2 from "../assets/images/css.png";
import skill3 from "../assets/images/js.png";
import skill4 from "../assets/images/react.png";
import skill5 from "../assets/images/python.png";
import skill6 from "../assets/images/java.png";
import skill7 from "../assets/images/c++.png";
import skill8 from "../assets/images/MySql.png";
import skill9 from "../assets/images/git.png";
import skill10 from "../assets/images/Github.png";
import skill11 from "../assets/images/TensorFlow.png";
import skill12 from "../assets/images/springboot.png";
import skillsBgImage from "../assets/images/background2.jpg";

const skillsData = [
  { name: "HTML", icon: skill1 },
  { name: "CSS", icon: skill2 },
  { name: "JavaScript", icon: skill3 },
  { name: "React", icon: skill4 },
  { name: "Python", icon: skill5 },
  { name: "Java", icon: skill6 },
  { name: "C++", icon: skill7 },
  { name: "MySQL", icon: skill8 },
  { name: "Git", icon: skill9 },
  { name: "GitHub", icon: skill10 },
  { name: "TensorFlow", icon: skill11 },
  { name: "Spring Boot", icon: skill12 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${skillsBgImage})` }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Skills & <span className="text-cyan-400">Abilities</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-cyan-500/50 hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-16 h-16 mb-2"
              />
              <p className="text-white text-center font-semibold">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
