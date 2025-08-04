import React from "react";
import Image from "next/image";
import img from "../../../public/CodingOfWorldLogo.jpeg";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#EAEAEA] w-full">
      <div className="px-5 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              className="m-1 hover:scale-105 duration-300"
              src={img}
              alt="logo"
              width={200}
              height={200}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="/tools"
          >
            Tools
          </Link>
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="/about"
          >
            About
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="https://www.linkedin.com/company/codingofworld/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={25} />
          </Link>
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="https://www.instagram.com/codingofworld/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={25} />
          </Link>
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="https://www.facebook.com/codingofworld/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={25} />
          </Link>
          <Link
            className="text-[#ff2929] hover:scale-105 hover:text-[#ff0000fb] duration-300"
            href="https://www.twitter.com/codingofworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={25} />
          </Link>
        </div>
      </div>

      {/* Footer bottom */}
      <h4 className="text-[#ff2929] text-center font-semibold py-3">
        ©2025 CodingOfWorld. All rights reserved.
      </h4>
    </footer>
  );
};

export default Footer;
