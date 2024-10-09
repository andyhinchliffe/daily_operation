"use client"
import React from 'react'



import { FaHome } from "react-icons/fa";


const page = () => {
  return (<>

<div className='flex'>
<h1 className=' text-3xl pt-2 pl-4 font-semibold text-gray-400'>Daily Operation</h1> 
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <a href="./"><button  className="btn text-2xl bg-slate-900 text-gray-500 border-slate-900" ><FaHome /></button></a>

</div>

   


 

 




</div>



<h2 className=" ml-4 text-gray-400 text-xs">Lo-Fi Boom Bap Beats</h2>








    
    <div className="h-screen w-screen flex mt-24 justify-center">
    <div className="justify-center md:w-2/3 w-full ml-2 mr-2">
    <div className="collapse my-1  bg-base-300">
  <input type="radio" name="my-accordion-1" defaultChecked />
  <div className="collapse-title text-xl font-medium">How does the platform work?</div>
  <div className="collapse-content">
  <p>Our artists upload their music to the platform as individual tracks. When a track ends, another track by a random artist is automatically played, creating a continuous listening experience.</p>
  </div>
</div>
<div className="collapse  my-1 bg-base-300">
  <input type="radio" name="my-accordion-1" />
  <div className="collapse-title text-xl font-medium">Why don&#39;t I recognize any of the artists&#39; names?</div>
  <div className="collapse-content">
  <p>We ask every artist to release their music on our platform under a new alias or pseudonym exclusive to us, regardless of whether they&#39;ve released music on other platforms. Most of our artists are established musicians and producers, but they&#39;ve started a new project specifically for us.</p>
  </div>
</div>

<div className="collapse  bg-base-300">
  <input type="radio" name="my-accordion-1" />
  <div className="collapse-title  text-xl font-medium">Where can I hear full albums?</div>
  <div className="collapse-content">
    <p>Every artist has either already released or is working towards releasing a Beat Tape, which is our version of a full album. You can find all of these on our YouTube channel. Our compilation Beat Tapes, featuring a selection of our artists, are also available there.</p>
  </div>
</div>


<div className="collapse my-1 bg-base-300">
  <input type="radio" name="my-accordion-1" />
  <div className="collapse-title text-xl font-medium">Is the platform really free?</div>
  <div className="collapse-content">
    <p>Yes, while in development, the platform is free to use. However, the introduction of advertisements is planned for the future, though they haven&#39;t been implemented yet.</p>
  </div>
</div>

    </div>
    </div>
    <footer className="footer bg-neutral text-neutral-content p-10">
 <div className=''>
        <div class="text-xs">
          <strong className="block font-bold text-lg text-gray-400 font-medium">Daily Operation</strong>
          <a href="https://dailyoperation.uk">
          <p>Lo-fi Boom Bap Focus Beats</p>
          <p className="text-xstext-base" > dailyoperation.uk </p>
          </a>
        </div>
      </div>

      <div></div>
 <nav>
    <h6 className="footer-title">Daily Operation</h6>
    <a href="/faq" className="link link-hover">FAQ</a>
    <a href="/contact" className="link link-hover">Contact</a>
    <a href="https://youtube.com/@dailyoperationuk" className="link link-hover">YouTube</a>
    
    
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
    
    
  </nav>
  
</footer>
    </>)
}

export default page