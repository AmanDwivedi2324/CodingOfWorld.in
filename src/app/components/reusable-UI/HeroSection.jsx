import React from "react";
import { Rocket } from "lucide-react";
import { Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-[#ff2929] via-red-600 to-red-700 text-white py-24 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/HeroSection.jpg")' }}
    >
      {/* overlay  */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff2929]/90 via-red-600/85 to-red-700/90"></div>

      {/* content  */}
     <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 background-blur-sm rounded-full mb-6  border border-white/20 px-6 py-2 ">
            <span className="text-sm font-medium">Empowering Digital Innovation</span></div>
        <h1 className="text-6xl md:text-7xl leading-tight mb-8  font-bold">
            <span className="block bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">Future Tools</span>
            <span className="block text-white">for Creators</span>
        </h1>
            <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-3xl mx-auto leading-relaxed">Discover powerful tools, comprehensive courses, and innovative products designed to accelerate your digital journey and unlock your creative potential.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-10 py-4 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-700 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-2xl hover:shadow-blue-600/25 transform hover:-translate-y-1 hover:scale-105 flex gap-2"><span><Rocket /></span>Explore Tools</button>
            <button className="px-10 py-4 bg-white/10 text-white hover:bg-white/20 rounded-full text-lg font-bold border border-white/30 hover:border-white/50 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-2xl hover:shadow-blue-600/25 transform hover:-translate-y-1 hover:scale-105 flex gap-2"><span><Play /></span>Watch Demo</button>
        </div>
        </div>
      </div>
     </div>
     <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
