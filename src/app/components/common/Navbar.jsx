"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CowLogo from "../../../../public/CowLogo.svg";
import { useNavStore } from "@/app/data/zustand/navStore";
import { Menu,MenuItem,ProductItem,HoveredLink,MobileMenuItem } from "@/app/constants/NavbarConstants";


export default function Navbar() {
  const {active,setActive,isMobileMenuOpen,toggleMobileMenu,mobileActiveItem,setMobileActiveItem} = useNavStore();

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="relative w-full flex justify-center container mx-auto md:p-0 p-5 md:bg-transparent bg-[#ff2929] ">
        <div className="w-full flex justify-between items-center max-w-7xl md:p-4 p-0 md:bg-[#ff2929] md:rounded-full">
          
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src={CowLogo}
              height={96}
              width={120}
              alt="Coding of World Logo"
            />
          </Link>
          <div className="hidden md:flex items-center bg-blue-700 rounded-full px-10 py-3">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Products">
                <div className="grid grid-cols-2 gap-10 p-4">
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Courses">
                <div className="grid grid-cols-2 gap-10 p-4">
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                  <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Tools">
                <div className="grid grid-cols-2 gap-10">
                  <HoveredLink href="/tools/resume-maker">Resume Maker</HoveredLink>
                  <HoveredLink href="/tools/ats">ATS Tool</HoveredLink>
                  <HoveredLink href="/tools/json-formatter">JSON Formatter</HoveredLink>
                  <HoveredLink href="/tools/seo-title-maker">SEO Title Maker</HoveredLink>
                  <HoveredLink href="/tools/uuid-generator">UUID Generator</HoveredLink>
                  <HoveredLink href="/tools/meta-description">Meta Description</HoveredLink>
                  <HoveredLink href="/tools/regex-tester">Regex Tester</HoveredLink>
                  <HoveredLink href="/tools/instagram-caption">Instagram Caption</HoveredLink>
                  <HoveredLink href="/tools/jwt-decoder">JWT Decoder</HoveredLink>
                  <HoveredLink href="/tools/background-remover">Background Remover</HoveredLink>
                  <HoveredLink href="/tools/ai-cover-letter">AI Cover Letter</HoveredLink>
                  <HoveredLink href="/tools/youtube-classes">Youtube Classes</HoveredLink>
                </div>
              </MenuItem>
              <button className="px-4 py-1 rounded-full  border-2 bg-[#ff2929] hover:bg-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">Sign In</button>
            </Menu>
          </div>

          <div className="md:hidden z-50">
           <button onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              {isMobileMenuOpen ? (
                // Cross icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-black dark:text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-black dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        

        {isMobileMenuOpen && (
          <div className="absolute top-[80px] left-0 w-full bg-white dark:bg-black shadow-lg rounded-b-lg z-40 md:hidden">
            <MobileMenuItem
              item="Products"
              isOpen={mobileActiveItem === "Products"}
              onClick={setMobileActiveItem}
            >
              <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
              <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
              <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
            </MobileMenuItem>
            <MobileMenuItem
              item="Courses"
              isOpen={mobileActiveItem === "Courses"}
              onClick={setMobileActiveItem}
            >
              <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
              <ProductItem title="Difmo" href="https://difmo.com" src="https://assets.aceternity.com/demos/algochurn.webp" description="..." />
            </MobileMenuItem>
            <MobileMenuItem
              item="Tools"
              isOpen={mobileActiveItem === "Tools"}
              onClick={setMobileActiveItem}
            >
              <HoveredLink href="/tools/resume-maker">Resume Maker</HoveredLink>
                  <HoveredLink href="/tools/ats">ATS Tool</HoveredLink>
                  <HoveredLink href="/tools/json-formatter">JSON Formatter</HoveredLink>
                  <HoveredLink href="/tools/seo-title-maker">SEO Title Maker</HoveredLink>
                  <HoveredLink href="/tools/uuid-generator">UUID Generator</HoveredLink>
                  <HoveredLink href="/tools/meta-description">Meta Description</HoveredLink>
                  <HoveredLink href="/tools/regex-tester">Regex Tester</HoveredLink>
                  <HoveredLink href="/tools/instagram-caption">Instagram Caption</HoveredLink>
                  <HoveredLink href="/tools/jwt-decoder">JWT Decoder</HoveredLink>
                  <HoveredLink href="/tools/background-remover">Background Remover</HoveredLink>
                  <HoveredLink href="/tools/ai-cover-letter">AI Cover Letter</HoveredLink>
                  <HoveredLink href="/tools/youtube-classes">Youtube Classes</HoveredLink>
            </MobileMenuItem>
          </div>
        )}
      </div>
    </div>
  );
}