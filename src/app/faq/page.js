"use client"
import React from 'react'



import { FaHome } from "react-icons/fa";


const page = () => {
  return (<>

<div className='flex'>
<h1 className=' text-3xl pt-2 pl-4 font-semibold text-[#eb761d]'>Daily Operation</h1>
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <a href="./"><button className="btn text-2xl text-[#eb761d] bg-transparent hover:bg-[#745c4d] hover:border-[#745c4d] border-transparent" ><FaHome /></button></a>

</div>

   


 

 




</div>



<h2 className=" ml-4 text-[#ceb8ae] text-xs">Lo-Fi Boom Bap Beats</h2>








    
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
  <div className="collapse-title text-xl font-medium">Why Is the Platform in Beta Mode?</div>
  <div className="collapse-content">
  <p>The platform is currently in beta mode as we evaluate server capacity and implement new features. During this phase, we are closely monitoring system performance and user interactions to ensure a seamless experience upon full release.</p>
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
    <footer className="footer bg-[#5c4d45] text-[#ceb8ae]-content p-10 mt-10">
 <div className='text-[#ceb8ae]'>
        <div className="text-xs">
          <strong className="block font-bold text-lg text-[#ceb8ae] font-medium">Daily Operation</strong>
          <a href="https://dailyoperation.uk">
          <p className="text-[#ceb8ae]">The Lo-fi Boom Bap Beats Music Platform</p>
          <p className="text-xs text-[#ceb8ae]" > dailyoperation.uk </p>
          </a>
        </div>
      </div>

      <div></div>
 <nav>
    <h6 className="footer-title text-[#ceb8ae]">Daily Operation</h6>
    <a href="https://blog.dailyoperation.uk" className="link link-hover text-[#ceb8ae] ">Blog</a>
    <a href="/contact" className="link link-hover text-[#ceb8ae] ">Contact</a>
    <a href="https://youtube.com/@dailyoperationuk" className="link link-hover text-[#ceb8ae]">YouTube</a>
    
    
  </nav>
  <nav>
    <h6 className="footer-title text-[#ceb8ae] ">Legal</h6>
    <a href="/terms-of-use" className="link link-hover text-[#ceb8ae] ">Terms of use</a>
    <a href="/privacy-policy" className="link link-hover text-[#ceb8ae] ">Privacy policy</a>
    <a href="/cookie-policy" className="link link-hover text-[#ceb8ae]">Cookie policy</a>
    
    
  </nav>
  
</footer>
    </>)
}

export default page