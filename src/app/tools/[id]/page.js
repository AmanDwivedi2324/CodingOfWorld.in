'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import ResumeReceiver from '@/app/components/ResumeReceiver';

const toolContent = {
  "ats-checker": <ResumeReceiver />,
  "json-formatter": "Main hu JSON Formatter",
  "seo-title-maker": "Main hu SEO Title Maker"
};

const Page = ({ params }) => {
  const { id } = use(params);  // ✅ unwrap the promise

  const content = toolContent[id];
  if (!content) return notFound();

  return (
    <div className="text-center text-xl mt-10">
      {content}
    </div>
  );
};

export default Page;
