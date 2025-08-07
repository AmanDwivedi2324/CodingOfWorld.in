"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../common/Navbar';

// The WavyBlanket component now accepts children as a prop
const WavyBlanket = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    // Outer container for the entire WavyBlanket page
    <div className="relative w-full overflow-hidden flex justify-center ">
      {/* Navbar is rendered here, on top of the blanket */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* The motion div for the wavy blanket animation */}
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        animate={isVisible ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative rounded-[40px] w-full max-w-7xl h-[150vh] bg-black overflow-hidden"
        style={{ zIndex: -1 }} 
      />

      {/* The child content is rendered here, on top of the blanket */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-full max-w-7xl h-full p-8 z-0">
        {children}
      </div>
    </div>
  );
};

export default WavyBlanket;