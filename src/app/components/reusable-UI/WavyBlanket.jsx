// src/components/reusable-UI/WavyBlanket.jsx (Corrected)
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const WavyBlanket = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen container mx-auto max-w-7xl rounded-0 md:rounded-t-[45px]  flex flex-col justify-center overflow-hidden">
      
    
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        animate={isVisible ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full max-w-7xl md:p-4 p-0  h-full bg-black"
        style={{ zIndex: -2 }}
      >
      </motion.div>
      
      <div className="relative w-full z-10">
        <Navbar />
      </div>

      <div className="flex-grow p-8 z-0 relative">
        {children}
      </div>

      <div className="w-full z-10">
        <Footer />
      </div>
    </div>
  );
};

export default WavyBlanket;