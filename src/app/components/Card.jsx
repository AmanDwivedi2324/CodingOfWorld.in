"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const Card = ({ image, title, description, link, buttonText = "Try Now" }) => {
  return (
    <div className="bg-[#111] hover:border-2 hover:border-[#0F0BFF] text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 flex flex-col h-72 w-60 hover:scale-105 cursor-pointer">
      {/* Image */}
      <div className="relative w-full h-44">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[16x] font-semibold mb-1 text-center">{title}</h3>
        <p className="text-[12px] text-[#828282] flex text-center mb-4">
          {description}
        </p>

        <Link href={link} className="mt-auto w-full flex justify-center">
          <button className="bg-[#ff2929] text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-1 cursor-pointer">
            {buttonText} <ArrowRightIcon className="w-4 h-4 text-[#0D00FF]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
