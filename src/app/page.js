"use client";
import React from 'react';
import { useEffect } from "react";
import styles from "./page.module.css";
import TextTransition, { presets } from 'react-text-transition';
import { FaCircleChevronDown } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";

const TEXTS = ['DAILY', 'OPERATION'];

const Page = () => {
  const [index, setIndex] = React.useState(0);

  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisible4] = React.useState(false);
  const [visible5, setVisible5] = React.useState(false);
  const [visible6, setVisible6] = React.useState(false);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (<body>
  
  
    <div className="flex items-center justify-center min-h-screen">
    
      <div
        className={styles.main}
        // style={{ backgroundImage: "url('/background2.jpeg')" }}
      >
      <video 
    src="/background.mp4"
    autoPlay
    muted
    loop
    className={styles.video}/> 
        {/* <h1 className=" text-white font-semibold text-9xl">DAILY</h1>
        <h1 className="text-center text-white font-semibold text-9xl">OPERATION</h1> */}
        
        <h1 className="text-6xl text-center text-[#3192c5] font-semibold md:text-9xl">
        
      <TextTransition springConfig={presets.gentle}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h1>
    <p className="mt-2 mb-4  text-xl text-gray-100">WebApps, Sites, Coding</p>
        
      <button className='text-gray-100'
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      >
        <FaCircleChevronDown className="text-[#3192c5]" size={25}/>
      </button>
      
      </div>
    </div>
    <div className="bg-[#A9ADB1] px-2 flex flex-wrap justify-center">-
    <div className="card w-96 h-96 m-10 bg-gray-100 shadow-xl">
  <figure><img src="site7.jpg" alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">Grassroots Stage</h2>
    {visible1 ? <p>Mobile first web app used at the Sheffield Food Festival displaying set times and biogs of grassroots artists<p className='mt-6'><a  href="https://grassroots-sheffield.co.uk/">Link</a></p></p> : null}

    <div className="card-actions justify-end">
      <button onClick={() => setVisible1(!visible1)} className="btn btn-[#A9ADB1]"><CiCircleInfo size={20}/></button>
    </div>
  </div>
</div>

{/* s */}

<div className="card w-96 h-96 m-10 bg-gray-100 shadow-xl">
  <figure><img className="m-1" src="sff_desktop_about.jpeg" alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">Desktop Version</h2>
    {visible4 ? <p>Desktop Version built to give more information about each individual artist. </p> : null}
    <div className="card-actions justify-end">
    <button onClick={() => setVisible4(!visible4)} className="btn btn-[#A9ADB1]"><CiCircleInfo size={20}/></button>
    </div>
  </div>
</div>



<div className="card w-96 h-96 m-10 bg-gray-100 shadow-xl">
  <figure><img src="banner_mockup.jpg" alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">QR Code Banner</h2>
    {visible5 ? <p>QR code for customers to access the full site.</p> : null}
    <div className="card-actions justify-end">
    <button onClick={() => setVisible5(!visible5)} className="btn btn-[#A9ADB1]"><CiCircleInfo size={20}/></button>
    </div>
  </div>
</div>


<div className="card w-96 h-96 m-10 bg-gray-100 shadow-xl">
  <figure><img src="cards.jpg" alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">NFC cards</h2>
    {visible6 ? <p>NFC cards for customers to access the full site.</p> : null}
    <div className="card-actions justify-end">
    <button onClick={() => setVisible6(!visible6)} className="btn btn-[#A9ADB1]"><CiCircleInfo size={20}/></button>
    </div>
  </div>
</div>









    {/* <div style={{ height: 1000 }}></div> */}
      <div></div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
  <aside>
    <p>Copyright © 2024 - All right reserved by Daily Operation</p>
  </aside>
</footer>
  </body>);
};

export default Page;
