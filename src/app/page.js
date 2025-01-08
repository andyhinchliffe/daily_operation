"use client"

import { useState, useEffect } from 'react';

import Image from "next/image";

import {Howl, Howler} from 'howler';
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FaList } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import CookieConsent from "react-cookie-consent";
import { FaShuffle } from "react-icons/fa6";
import AdBanner from "./components/AdBanner";







export default function Home() {

  
  const [artistDataWP, setArtistDataWP] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [artist, setArtist] = useState(null); 
  const [trackPath, setTrackPath] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [frontPage, setFrontPage] = useState(true);
  const [startedSelection, setStartedSelection] = useState(false);
  
  const [artistDisplay, setArtistDisplay] = useState(null);
  const [artistDisplayInfo, setArtistDisplayInfo] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showinfo, setShowInfo] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [playLimitNum, setPlayLimitNum] = useState(7);
  const [cookieConsent , setCookieConsent] = useState(false);
  const [numToLoad , setNumToLoad] = useState(16);
  const [loadscreen , setLoadscreen] = useState(true);
  const [inShuffleMode , setInShuffleMode] = useState(false);
  const [maxDisplayNum , setMaxDisplayNum] = useState(70);

  const {Howl, Howler} = require('howler');
  

  useEffect(() => {
    fetch(`https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?_embed&per_page=${numToLoad}`, {
      method: 'GET',
    })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Work with the received post data
    // setFrontPage(false);
    setArtistDataWP(data)
    setPlaying(data[3])
    const trackId = data[3].id;
    setTrackPath(`https://develop.dailyoperation.uk/audio/track${trackId}.mp3`)
    setIsLoaded(true);
    
    
    console.log("got it!")
    console.log(artistDataWP)
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  

  }, [numToLoad]);


  // const fetchPost16 = () => {
  //   fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts/16?_embed', {
  //     method: 'GET',
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     setPlaying(data);
  //     console.log("got it!");
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });
  // };
  // const updatePlaying = () => {

  //   setPlaying(post) 
  // }
  // const updatePath = () => {

  //   setTrackPath(`../audio/track` + `${playing.id}` + `.mp3`)
  //   console.log(trackPath)
  // }

  const handlePostClick = (post) => {
    setPlaying(post);
    handlePlay(post);
    setStartedSelection(true);
  };

  const handlePlay = (track) => {
    if (currentSound) {
      currentSound.stop();
      setPlayCount(prevCount => prevCount + 1);  // Use functional setState
    }
  
    if (playCount < playLimitNum) {
      const trackId = track.id;
      const newTrackPath = `https://develop.dailyoperation.uk/audio/track${trackId}.mp3`;
      const sound = new Howl({
        src: [newTrackPath],
        html5: true,
        onend: handleNextTrack
      });
      
      setCurrentSound(sound);
      setIsSoundPlaying(true);
      sound.play();
    } else {
      handleTimeLimit();
    }
  };
  

  const handleNextTrack = () => {
    setPlayCount(prevCount => {
        Howler.unload();
        const newCount = prevCount + 1;
        
        // Check the new playCount value after incrementing
        if (newCount >= playLimitNum) {
            handleTimeLimit();
            return newCount; // Return the updated count
        }

        // Get the next track from the list if limit is not reached
        const nextTrack = artistDataWP[Math.floor(Math.random() * artistDataWP.length)];

        // Update the current track and play it
        setPlaying(nextTrack);
        handlePlay(nextTrack);

        return newCount; // Ensure the count is returned correctly
    });
};


  
  

  const handleStop = () => {

    Howler.unload();
    setIsSoundPlaying(false);
    
  };

  const reStart = () => {
    currentSound.play();
    setIsSoundPlaying(true);
  };

  const handlePause = () => {
    currentSound.pause();
    setIsSoundPlaying(false);
  };

  const stopAll = () => {
    Howler.unload();
    setIsSoundPlaying(false);
  };

  const handleTimeLimit = () => {
    // Pause the music and show modal
    console.log("Pausing music as play limit reached.");
    handleStop();  // Stops all active sounds
    setIsSoundPlaying(false);  // Update state to reflect pause
    // handleNextTrack();
    document.getElementById('my_modal_8').showModal(); // Display the modal
  };
  
  // const checkPlayCount = () => {
  //   if (playCount > 5) {
  //     handleStop();
  //     handleTimeLimit();
  //   }
  // };

  const resetPlayCount = () => {
    
    setPlayCount(0);
    // setIsSoundPlaying(false);
  };

  


  // const getCategoryIDByName = async (categoryName) => {
  //   const response = await fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/categories');
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch categories');
  //   }
  //   const categories = await response.json();
  //   const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  //   return category ? category.id : null;
  // };

  
  // const fetchPostsByCategory = async (categoryID) => {
  //   const response = await fetch(`https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?categories=${categoryID}&_embed`, {
  //     method: 'GET',
  //   });
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const posts = await response.json();
  //   return posts;
  // };

  // const handleAgree = () => {
  //   setCookieConsent(true);
  // };

  const handleShowMore = () => {
    setNumToLoad(numToLoad + 16);
  };


  const handleShuffleMode = () => {
    setNumToLoad(maxDisplayNum);
    setPlayLimitNum(75);
    handlePostClick(artistDataWP[Math.floor(Math.random() * artistDataWP.length)]);
    setInShuffleMode(!inShuffleMode);
  };
  

  


  
    
  return (<>

  {/* <h2 className="text-white">{playCount}</h2> */}

<dialog id="my_modal_8" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg bg-white">Hey!</h3>
    <p className="py-4">Are you still listening? Press continiue to keep the music playing. Or switch to shuffle mode for longer listening listening.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={resetPlayCount}>Keep playing</button>
      </form>
    </div>
  </div>
</dialog>


{/* ----CookieBanner---- */}

<CookieConsent
  location="bottom"
  buttonText="That's fine"
  cookieName="dailyOperationCookie"
  style={{ background: "#2B373B" }}
  buttonStyle={{ background: "#eb761d", color: "#4e503b", fontSize: "12px", borderRadius: "5px" }}
  expires={150}
>
  This website uses cookies to enhance the user experience.{" "}
  <a href='./cookie-policy'><span style={{ fontSize: "10px" }}>Read more about our cookies policy here.</span></a>
</CookieConsent>


{/* ----CookieBanner---- */}

  


  <div>




   <div className='flex'>
<h1 className=' text-3xl pt-2 pl-4 font-semibold text-[#eb761d]'>Daily Operation</h1> 
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <button className="btn text-2xl text-[#eb761d] bg-transparent hover:bg-[#745c4d] hover:border-[#745c4d] border-transparent" ><FaHome /></button>

</div>

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <button className={`btn text-2xl ${
    inShuffleMode ? 'bg-[#745c4d]' : 'bg-transparent'
  } text-[#eb761d] border-transparent hover:bg-[#745c4d] hover:border-transparent`} onClick={() => handleShuffleMode()}><FaShuffle /></button>


<a href="https://info.dailyoperation.uk"><div className="hidden sm:block ml-2 text-[#ceb8ae] font-semibold text-[#eb761d] hover:bg-[#745c4d] hover:border-[#745c4d] p-3 rounded rounded-xl">Blog</div></a>

 {/* Open the modal using document.getElementById('ID').showModal() method */}
 <button className="btn hidden sm:block text-2xl text-[#eb761d] bg-transparent hover:bg-[#745c4d] hover:border-[#745c4d] border-transparent" onClick={()=>document.getElementById('my_modal_3').showModal()}><CiSearch/></button>
<dialog id="my_modal_3" className="modal ">
  <div className="modal-box bg-[#ceb8ae]">
    <h3 className="font-bold text-lg bg-[#ceb8ae]">Search</h3>
    <p className="py-4">Search feature in development.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-[#eb761d] border-[#eb761d]">Close</button>
      </form>
    </div>
  </div>
</dialog>

 {/* Open the modal using document.getElementById('ID').showModal() method */}
 <button className="btn text-2xl text-[#eb761d] bg-transparent hover:bg-[#745c4d] hover:border-[#745c4d] border-transparent " onClick={()=>document.getElementById('my_modal_4').showModal()}><CiCircleInfo /></button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box bg-[#ceb8ae]">
    <h3 className="font-bold text-lg ">Info</h3>
    <div>
    <p className="mb-4 ">
    Welcome to the ultimate destination for Lo-Fi, Boom Bap & chilled beats! Our platform is a haven for those who crave smooth, soulful rhythms fused with the raw, gritty essence of boom bap. Inspired by classic hip-hop and the chilled vibes of lo-fi, we bring you a curated selection of instrumentals perfect for relaxation, studying, creative projects, or simply vibing out. Our collection blends the timeless, drum-heavy patterns of boom bap with the laid-back, nostalgic atmosphere of lo-fi music. Whether you&#39;re an artist looking for the perfect background track or a listener who enjoys mellow beats with that old-school hip-hop feel, our platform has something for everyone. Tune in to experience seamless playlists, handpicked by experts, designed to help you focus, unwind, or find inspiration in the grooves of soulful samples and dusty drums.
</p>

</div>

<p className="font-bold">Features include:</p>

<ul className="mb-4">
  <li className="mb-4">Hig h-Quality Playlists: Carefully curated Lo-Fi Boom Bap mixes, updated regularly to ensure a fresh and consistent vibe.</li>
  <li className="mb-4">No Interruptions: Ad-free, non-stop listening for uninterrupted chill sessions.</li>
  <li className="mb-4">Perfect for All Occasions: From background ambiance to focus music or beat-making inspiration, our platform provides the soundtrack for your day.</li>
  <li className="mb-4">Support for Creators: Access beats for personal projects, podcasts, or videos, while supporting independent beatmakers.</li>
</ul>

<p className="mb-4">
  Immerse yourself in the world of laid-back rhythms and old-school textures with our exclusive Lo-Fi Boom Bap Beats. Let the beats take over!
</p>
<a href="./faq">
<div className="font-bold " >Click for our FAQ</div>
</a>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-[#eb761d] border-[#eb761d]">Close</button>
      </form>
    </div>
  </div>
</dialog>






</div>



{/* <h2 className='pl-4   text-gray-400'>Lo-fi Boom Bap Focus Beats</h2>
<h2 onClick={handleNextTrack} className="text-white">{playCount}</h2>  */}








</div>
 {frontPage ?  <div className='flex justify-center  text-white h-screen'>
 
 <div className="card bg-black image-full w-72 shadow-xl w-96 h-56 mt-16 ">
  <figure >
    <img
      style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
      src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Shoes" />
  </figure>
  <div className="card-body ">
    <h2 className="card-title text-[#ceb8ae]">The Platform For</h2>
    
    <p className="text-[#ceb8ae] animate-fade-up">Lo Fi, Boom Bap & chilled beats</p>
    <div className="card-actions justify-end">
    {!isLoaded ?<span className="loading loading-ring loading-lg"></span> : <button className="btn bg-[#eb761d] border-[#eb761d] hover:bg-[#987d6e] hover:border-[#987d6e]" onClick={() => setFrontPage(false)}>Enter</button>}
    
      
    </div>
  </div>
</div></div> : 
  

<div className="flex  md:columns-2 ">

<div className='hidden w-36 lg:block'>


<h2 className=" ml-4 text-[#ceb8ae] text-xs">The Lo-fi, Boom Bap & chilled beats music platform</h2>

<div className=" ml-4 text-[#ceb8ae] font-semibold text-sm">Beta Version</div>




<div className="flex h-screen flex-col justify-between  bg-transparent">
  <div className="px-2">
    
  
    <ul className="mt-6 space-y-1">
      <li>
        <a
          href="./"
          className="block bg-transparent rounded-lg bg-[#2f2927]  px-4 py-4 text-sm font-medium text-[#eb761d] hover:bg-[#745c4d] hover:border-[#745c4d]"
        ><div className='flex gap-2'><FaHome />Home</div>
          
        </a>
      </li>

      

      


      </ul>
<div>

<a href="./artists" className="bg-transparent border-transparent btn bg-[#2f2927] text-[#eb761d] border-[#2f2927] hover:bg-[#745c4d] hover:border-[#745c4d]" ><FaList />Artists</a>
{/* <button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><FaList />Playlist</button> */}

</div>
      <div>

      
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="bg-transparent border-transparent btn bg-[#2f2927] border-[#2f2927] text-[#eb761d] hover:bg-[#745c4d] hover:border-[#745c4d]" onClick={()=>document.getElementById('my_modal_9').showModal()}><CiSearch />Search</button>
<dialog id="my_modal_9" className="modal">
  <div className="modal-box bg-[#ceb8ae]">
    <h3 className="font-bold text-lg">Search</h3>
    <p className="py-4">Search feature in development</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-[#eb761d] border-[#eb761d]">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>

<div className="mt-72 text-black">{playCount}</div>
<div className="text-black">{playLimitNum}</div>



      
    

<div>    
          {/* Open the modal using document.getElementById('ID').showModal() method */}


</div>
  </div>

  {/* <div className="flex flex-col min-h-screen ">
    <a href="https://dailyoperation.uk/" className="mt-20flex items-center gap-2 bg-slate-900 p-4  bottom-0">
      
      
      <div className='bg-slate-900'>
        <p class="text-xs ">
          <strong className="block text-gray-400 font-medium">The Lo-fi Boom Bap Beats Music Platform</strong>
          
        </p>
      </div>
    </a>
  </div> */}
</div>

</div>
<div className='mx-auto'>



{startedSelection && (
      <div className="flex  h-44 m-6 w-72 md:w-96 bg-[#987d6e] lg:card-side shadow-xl rounded rounded-xl">
   
  <figure>
    <img className="rounded-lg w-44 h-44"
      src={playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}
      alt="Album" />
  </figure>
  

  
  
  <div className="mx-auto  card-body bg-[#987d6e] rounded-xl">
  <h2 className="card-title text-[#eb761d]">{playing.title.rendered}</h2>
    <p className='text-[#ceb8ae]'>{playing._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')}</p>
                
    <div className="card-actions justify-end">
    

      {isSoundPlaying ? <button onClick={handlePause} ><CiPause1 /></button> : <button onClick={reStart}><FaPlay /></button>}
      
    </div>
  </div>
</div>
)}
  
{!startedSelection && ( 
      <div className="flex h-44 m-6 w-72 md:w-96 bg-[#745c4d] lg:card-side shadow-xl rounded rounded-xl">
   
  <figure>
    <img className="rounded-lg w-44 h-44"
      src="stereo.jpg"
      alt="Album" />
  </figure>
  

  
  
  <div className=" pl-4 card-body bg-[#745c4d] rounded-xl">
  <h2 className="card-title text-[#ceb8ae]">Select a track</h2>
  <div>
  <p className='text-xs font-bold text-[#ceb8ae] '>Click any track below to load</p>
  <p className='text-xs text-[#ceb8ae]'>(or click on shuffle mode)</p>
  </div>
    
                
    <div className="card-actions justify-end">
    
      {startedSelection &&(
      <button onClick={handleStop} >STOP</button>

    )}
    </div>
  </div>
</div>
)}


  {/* {artistDisplay && (
    <p className='text-3xl font-semibold text-gray-400'>{artistDisplay}</p>
    
  )} */}
    <div className="mx-6 pt-10 bg-transparent grid flex flex-wrap grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {artistDataWP.map(post => (
            <div key={post.id}>
            
            <Image onClick={() => handlePostClick(post)}  className='rounded-lg hover:cursor-pointer shadow-lg hover:scale-105 duration-300' src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text} width={150} height={150}/>
              <h2 className="text-[#eb761d]">{post.title.rendered}</h2>

              <a href={`./${post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.slug : ''
                )).filter(Boolean).join(', ')}`}>
              <p onClick={() => setArtistDisplay(post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')) 
                } className="text-[#ceb8ae] font-base hover:font-semibold text-sm">
                {post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')}
              </p>
              </a>
              
              {/* <button onClick={() => setTrackPath("../audio/track" + post.id +".mp3")} className="text-slate-200">Play me</button> */}
              
              
              {/* <p className='text-slate-200'>{playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}</p> */}
              
              
              
              
            </div>
          ))}
        </div>
      {/* <button className="text-slate-200" onClick={fetchPost16}>random</button>
      <button onClick={fetchPost16}>post16</button>
      <button onClick={handlePlay}>play</button>
      <button onClick={handleStop}>stop</button>
      <p className="text-slate-200">{trackPath}</p>
      <button onClick={stopAll}>STOP ALL</button> */}
      
      
      </div>   
      
      
      </div>
      

 }




{/* -----More button ----- */}
 {frontPage ?  <div></div> :<div className="flex justify-center">

  {numToLoad < maxDisplayNum && (
  <button className="mt-10 border-slate-700 btn-sm btn bg-[#eb761d] text-[#5c4d45] hover:bg-[#5c4d45] hover:text-[#ceb8ae]" onClick={handleShowMore}>Load more</button>
)}
</div>}

{/* ------More Button -------- */}

<AdBanner
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                dataAdSlot="1911681227"
              />


 <footer className="footer bg-[#5c4d45] text-[#ceb8ae]-content p-10 mt-10">
 <div className='text-[#ceb8ae]'>
        <div className="text-xs">
          <strong className="block font-bold text-lg text-[#ceb8ae] font-medium">Daily Operation</strong>
          <a href="https://dailyoperation.uk">
          <p className="text-[#ceb8ae]">The Lo-fi, Boom Bap  chilled beats music platform</p>
          <p className="text-xs text-[#ceb8ae]" > dailyoperation.uk </p>
          </a>
        </div>
      </div>

      <div></div>
 <nav>
    <h6 className="footer-title text-[#ceb8ae]">Daily Operation</h6>
    <a href="https://info.dailyoperation.uk" className="link link-hover text-[#ceb8ae] ">Blog</a>
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
  </>
  );
}
