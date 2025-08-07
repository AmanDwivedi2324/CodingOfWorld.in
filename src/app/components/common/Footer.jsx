// src/components/common/Footer.jsx (Corrected and Responsive)
"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    // The main container for the footer, with responsive padding and background
    <div className="relative w-full flex justify-center container mx-auto md:p-0 p-5 md:bg-transparent bg-[#ff2929] ">
      <footer className="w-full max-w-7xl md:p-4 p-0 md:bg-[#ff2929] ">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Main content container. Stacks vertically on mobile and horizontally on desktop */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Logo and About Section */}
            <div className="flex-shrink-0">
              {/* Ensure this is a Link component if it navigates somewhere */}
              <Link href="/" className="text-7xl md:text-7xl  font-bold text-white">Coding Of World</Link>
              <p className="mt-2 text-sm max-w-sm">
                Your one-stop destination for modern tools and resources.
              </p>
            </div>

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-2">Products</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/products/product-1" className="hover:text-white transition-colors duration-200">Product One</Link>
                  </li>
                  <li>
                    <Link href="/products/product-2" className="hover:text-white transition-colors duration-200">Product Two</Link>
                  </li>
                  <li>
                    <Link href="/products/product-3" className="hover:text-white transition-colors duration-200">Product Three</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Courses</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/products/product-1" className="hover:text-white transition-colors duration-200">Course One</Link>
                  </li>
                  <li>
                    <Link href="/products/product-2" className="hover:text-white transition-colors duration-200">Course Two</Link>
                  </li>
                  <li>
                    <Link href="/products/product-3" className="hover:text-white transition-colors duration-200">Course Three</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Tools</h3>
                <ul className="space-y-1">
                  <li><Link href="/tools/resume-maker" className="hover:text-white transition-colors duration-200">Resume Maker</Link></li>
                  <li><Link href="/tools/ats-tools" className="hover:text-white transition-colors duration-200">ATS Tool</Link></li>
                  <li><Link href="/tools/json-formatter" className="hover:text-white transition-colors duration-200">JSON Formatter</Link></li>
                  <li><Link href="/tools/seo-title-maker" className="hover:text-white transition-colors duration-200">SEO Title Maker</Link></li>
                  <li><Link href="/tools/uuid-generator" className="hover:text-white transition-colors duration-200">UUID Generator</Link></li>
                  <li><Link href="/tools/meta-description" className="hover:text-white transition-colors duration-200">Meta Description</Link></li>
                  <li><Link href="/tools/regex-tester" className="hover:text-white transition-colors duration-200">Regex Tester</Link></li>
                  <li><Link href="/tools/instagram-caption" className="hover:text-white transition-colors duration-200">Instagram Caption</Link></li>
                  <li><Link href="/tools/jwt-decoder" className="hover:text-white transition-colors duration-200">JWT Decoder</Link></li>
                  <li><Link href="/tools/background-remover" className="hover:text-white transition-colors duration-200">Background Remover</Link></li>
                  <li><Link href="/tools/ai-cover-letter" className="hover:text-white transition-colors duration-200">AI Cover Letter</Link></li>
                  <li><Link href="/tools/youtube-classes" className="hover:text-white transition-colors duration-200">YouTube Classes</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          {/* Bottom Section with Copyright and Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
            <div className="space-y-2 md:space-y-0">
              <p className="text-center md:text-left">
                © {new Date().getFullYear()} Coding Of World. All rights reserved.
              </p>
              <div className="flex justify-center md:justify-start space-x-3 text-gray-400">
                <Link href="/about" className="hover:text-white transition-colors duration-200 text-nowrap">About Us</Link>
                <span className="ml-2">|</span>
                <Link href="/contact" className="hover:text-white transition-colors duration-200 text-nowrap">Contact Us</Link>
                <span className="ml-2">|</span>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200 text-nowrap">Privacy Policy</Link>
                {/* <span className="ml-2">|</span> */}
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;