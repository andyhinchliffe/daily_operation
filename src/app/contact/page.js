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



<h2 className='pl-4   text-gray-400'>Lo-fi Boom Bap Focus Beats</h2>
 
    <div className="flex justify-center min-h-screen">

    
    
    <div className="card bg-base-100 mt-20 h-64 w-96 shadow-xl">
    <figure className="px-10 pt-10">
      
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title mb-10 text-2xl">Contact</h2>
      
      <div className="card-actions">
        <a href="mailto:dailyoperation1979@gmail.com"><button className="btn btn-primary">Open Email</button></a>
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