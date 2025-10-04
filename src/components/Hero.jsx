import React from "react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaCode, FaHackerrank } from "react-icons/fa";
import profilePic from "../assets/images/profile.jpg";
import backgroundImage from "../assets/images/background1.jpg";

const Hero = () => {
  return (
    // ✓ UPDATED: Replaced 'min-h-screen' with stable padding to fix mobile layout jumps
    <section
      id="home"
      className="flex flex-col justify-center bg-cover bg-center bg-fixed pt-40 pb-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-around text-white">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hello, <br /> I'm <span className="text-cyan-400">Hans Raj</span>
          </h1>
          <div className="text-2xl md:text-3xl font-semibold mb-6">
            I Am Into{" "}
            <TypeAnimation
              sequence={[
                "Web Development.", 2000,
                "AI & ML.", 2000,
                "Machine Learning.", 2000,
                "Deep Learning.", 2000,
                "Backend Development.", 2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-cyan-300"
              repeat={Infinity}
            />
          </div>
          
          {/* ✓ UPDATED: Corrected the link to the resume */}
          <a
            href="/Resume.pdf"
            target="_blank"
            className="inline-block bg-cyan-500 text-black font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition duration-300 text-lg shadow-lg"
          >
            View Resume
          </a>
          
          <div className="flex justify-center md:justify-start space-x-6 mt-8">
            <a
              href="https://leetcode.com/u/hansraj61/"
              aria-label="View LeetCode Profile"
              target="_blank"
              className="text-3xl hover:text-cyan-400 hover:scale-125 hover:-translate-y-1 transition-all duration-300"
            >
              <FaCode />
            </a>
            <a
              href="https://github.com/HansrajS1"
              aria-label="View GitHub Profile"
              target="_blank"
              className="text-3xl hover:text-cyan-400 hover:scale-125 hover:-translate-y-1 transition-all duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/hansrajvvs"
              aria-label="View LinkedIn Profile"
              target="_blank"
              className="text-3xl hover:text-cyan-400 hover:scale-125 hover:-translate-y-1 transition-all duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.hackerrank.com/profile/rhansbtech22"
              target="_blank"
              aria-label="View HackerRank Profile"
              className="text-3xl hover:text-cyan-400 hover:scale-125 hover:-translate-y-1 transition-all duration-300"
            >
              <FaHackerrank />
            </a>
          </div>
        </div>

        <div className="md:w-1/3 mt-10 md:mt-0">
          <img
            src={profilePic}
            alt="Hans Raj"
            className="rounded-full w-72 h-72 md:w-96 md:h-96 object-cover mx-auto border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 transition-all duration-500 ease-in-out hover:scale-105 hover:border-8 hover:shadow-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;