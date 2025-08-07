"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../common/Navbar';

const WavyBlanket = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden flex justify-center ">
       <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>
      <motion.div
        initial={{ y: '-100%', opacity: 0 }} // Starts above the viewport
        animate={isVisible ? { y: '0%', opacity: 1 } : {}} // Drops down
        transition={{ duration: 1.5, ease: "easeOut" }} // Smooth drop animation
        // Blanket color and size, now constrained by max-w and mx-auto
        className="relative rounded-[40px] w-full max-w-7xl h-[150vh] bg-black  overflow-hidden "
        // z-index should be lower than the navbar's z-index (z-50)
        style={{ zIndex: -1 }} 
      >
      </motion.div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex flex-col items-center justify-center text-white text-4xl font-bold p-8 ">
        <h1>Welcome to the Wavy Page!</h1>
        <p className="text-xl mt-4">Enjoy the flowing experience.</p>
      </div>
    </div>
  );
};

export default WavyBlanket;