// "use client"
// import React, { useEffect, useRef } from "react";

// const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
//   const adRef = useRef(null);

//   useEffect(() => {
//     const renderAd = () => {
//       try {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//         window.adsbygoogle.update(adRef.current); 
//       } catch (error) {
//         console.error("Error rendering AdSense:", error.message);
//       }
//     };

//     // Render the ad on component mount
//     renderAd();

//     // Clean up on unmount (optional)
//     return () => {
//       // No cleanup needed in this specific case
//     };
//   }, [dataAdSlot, dataAdFormat, dataFullWidthResponsive]); 

//   return (
//     <ins 
//       ref={adRef} 
//       className="adsbygoogle" 
//       style={{ display: "block" }} 
//       data-ad-client="ca-pub-5775457776021614" 
//       data-ad-slot={dataAdSlot} 
//       data-ad-format={dataAdFormat} 
//       data-full-width-responsive={dataFullWidthResponsive.toString()}
//     ></ins>
//   );
// };

// export default AdBanner;