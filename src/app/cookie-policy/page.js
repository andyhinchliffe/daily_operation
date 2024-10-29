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
 
    <div className="flex justify-center min-h-screen">

    
    
    <div className="text-[#ceb8ae] mt-4 w-3/4 text-sm">Cookie Policy

_Last updated: [29th October 2024]_

Introduction

<div className="h-2"></div>

Welcome to dailyoperation.uk. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Cookie Policy explains how we use cookies on our website, particularly in relation to Google Analytics.

What Are Cookies?

Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners. Cookies allow us to improve our services and give you a more personalized experience.


<div className="h-2"></div>
How We Use Cookies

At dailyoperation.uk, we use cookies for various purposes, including:

- Analytics: We use Google Analytics to collect anonymous information about how visitors interact with our website. This helps us understand which pages are most frequently visited, the volume of visitors we receive, and the search terms and blog posts that generate the most traffic. This information is vital in allowing us to improve our site’s content and functionality to better meet the needs of our users.
<div className="h-2"></div>
Types of Cookies Used

We use the following types of cookies on our website:

- Google Analytics Cookies: These cookies collect information on visitor interactions with our site, such as pages visited, time spent on each page, and referring sites. The data gathered is aggregated and anonymized, meaning it does not allow us to personally identify users. The information is used purely for statistical purposes.

Managing Your Cookie Preferences

You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. This may prevent you from taking full advantage of the website.

- Disabling Cookies: If you choose to disable cookies in your browser settings, you can still access our website, though some features may not function as intended.

For more information on how Google uses data when you use our site, you can visit (https://policies.google.com/technologies/partner-sites).

Contact Us

If you have any questions about our Cookie Policy or how we handle your data, please contact us at:

Email: dailyoperation1979@gmail.com  
 

Thank you for visiting dailyoperation.uk. We appreciate your trust in us to use your data responsibly and transparently.</div>
    
  
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
    <a className="link link-hover text-[#ceb8ae] ">Terms of use</a>
    <a className="link link-hover text-[#ceb8ae] ">Privacy policy</a>
    <a href="/cookie-policy" className="link link-hover text-[#ceb8ae] ">Cookie policy</a>
    
    
  </nav>
  
</footer>
  </>)
}

export default page