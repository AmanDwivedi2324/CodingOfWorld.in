"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import CowLogo from "../../../../public/CowLogo.svg";

const Footer = () => {
  return (
    // The main container for the footer, with responsive padding and background
    <footer className="bg-gradient-to-br from-[#ff2929] to-red-700 text-white ">
      <div className="w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-4 gap-12 mb-12">
            <div class="md:col-span-2 lg:col-span-1">
              <div class="flex items-center space-x-3 mb-6">
                <Image src={CowLogo} />
              </div>
              <p class="text-red-200 mb-8 leading-relaxed">
                Your one-stop destination for modern tools and resources that
                accelerate productivity and creativity.
              </p>
              <div class="flex space-x-4">
                <a
                  class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 transform hover:-translate-y-1"
                  href="#"
                >
                  <i class="ri-github-fill text-white text-xl"></i>
                </a>
                <a
                  class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 transform hover:-translate-y-1"
                  href="#"
                >
                  <i class="ri-linkedin-fill text-white text-xl"></i>
                </a>
                <a
                  class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 transform hover:-translate-y-1"
                  href="#"
                >
                  <i class="ri-twitter-fill text-white text-xl"></i>
                </a>
                <a
                  class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 transform hover:-translate-y-1"
                  href="#"
                >
                  <i class="ri-instagram-fill text-white text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 class="font-bold text-xl mb-6 text-white">Products</h4>
              <ul class="space-y-3 text-red-100">
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Product One
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Product Two
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Product Three
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-xl mb-6 text-white">Courses</h4>
              <ul class="space-y-3 text-red-100">
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Course One
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Course Two
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Course Three
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-xl mb-6 text-white">Popular Tools</h4>
              <ul class="space-y-3 text-red-100 text-sm">
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Resume Maker
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    ATS Tool
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    JSON Formatter
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    SEO Title Maker
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    UUID Generator
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Meta Description
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Regex Tester
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Instagram Caption
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    JWT Decoder
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    Background Remover
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    AI Cover Letter
                  </a>
                </li>
                <li>
                  <a
                    class="hover:text-white transition-colors cursor-pointer hover:pl-2 duration-300 flex items-center group"
                    href="#"
                  >
                    <i class="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity mr-1"></i>
                    YouTube Classes
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-400/30 pt-8"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
