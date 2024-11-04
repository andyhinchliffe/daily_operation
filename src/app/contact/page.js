import React from 'react'

import { FaHome } from "react-icons/fa";

const page = () => {
  return (<>

<div className='flex'>
<h1 className=' text-3xl pt-2 pl-4 font-semibold text-[#eb761d]'>Daily Operation</h1>  
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <a href="./"><button className="btn text-2xl text-[#eb761d] bg-[#2f2927] hover:bg-[#745c4d] hover:border-[#745c4d] border-[#2f2927]" ><FaHome /></button></a>

</div>

   


 

 




</div>



<h2 className=" ml-4 text-[#ceb8ae] text-xs">Lo-Fi Boom Bap Beats</h2>


<div
  className="hero min-h-40 mt-20 rounded-xl mx-auto w-72"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-[#ceb8ae]">Contact</h1>
      <p className="mb-5 text-[#ceb8ae]">
        Get in touch with us.
      </p>
      <a href="mailto:info@dailyoperation.uk"><button className="btn text-[#ceb8ae] bg-[#eb761d] hover:bg-[#745c4d] hover:border-[#745c4d] border-0">Open Email</button></a>
    </div>
  </div>
</div>
 
    <div className="flex justify-center min-h-screen">

    
    
    
  
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