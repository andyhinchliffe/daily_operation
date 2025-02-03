'use client'; // This is absolutely essential!

import Script from 'next/script';
import React from 'react';
import Head from 'next/head';

const AdSense = ({ pId }) => {
  return (
    <Head>
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onError={(error) => {  // Add error handling!
        console.error("AdSense script failed to load:", error);
      }}
    />
    </Head>
  );
};

export default AdSense;
