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

  const {Howl, Howler} = require('howler');
  

  useEffect(() => {
    fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?_embed&per_page=16', {
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
    setFrontPage(false);
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

  

  }, []);


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
  

  


  
    
  return (<>

  {/* <h2 className="text-white">{playCount}</h2> */}

<dialog id="my_modal_8" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hey!</h3>
    <p className="py-4">Are you still listening? Press continiue to keep the music playing.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={resetPlayCount}>Keep playing</button>
      </form>
    </div>
  </div>
</dialog>

  


  <div>




   <div className='flex'>
<h1 className=' text-3xl pt-2 pl-4 font-semibold text-[#EAD8B1]'>Daily Operation</h1> 
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <button className="btn text-2xl bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><FaHome /></button>

</div>

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <button className="hidden sm:block btn text-2xl bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_2').showModal()}><FaList /></button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box hidden sm:block">
    <h3 className="font-bold text-lg">Playlist</h3>
    <p className="py-4">Playlist in development.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

<a href="./faq"><div className="mt-3 ml-2 text-gray-500 text-base">FAQ</div></a>

 {/* Open the modal using document.getElementById('ID').showModal() method */}
 <button className="btn hidden sm:block text-2xl bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_3').showModal()}><CiSearch/></button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Search</h3>
    <p className="py-4">Search feature in development.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

 {/* Open the modal using document.getElementById('ID').showModal() method */}
 <button className="btn text-2xl bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_4').showModal()}><CiCircleInfo /></button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Info</h3>
    <div>
    <p>
    Welcome to the ultimate destination for Lo-Fi Boom Bap Beats! Our platform is a haven for those who crave smooth, soulful rhythms fused with the raw, gritty essence of boom bap. Inspired by classic hip-hop and the chilled vibes of lo-fi, we bring you a curated selection of instrumentals perfect for relaxation, studying, creative projects, or simply vibing out. Our collection blends the timeless, drum-heavy patterns of boom bap with the laid-back, nostalgic atmosphere of lo-fi music. Whether you&#39;re an artist looking for the perfect background track or a listener who enjoys mellow beats with that old-school hip-hop feel, our platform has something for everyone. Tune in to experience seamless playlists, handpicked by experts, designed to help you focus, unwind, or find inspiration in the grooves of soulful samples and dusty drums.
</p>
</div>

<p>Features include:</p>

<ul>
  <li>High-Quality Playlists: Carefully curated Lo-Fi Boom Bap mixes, updated regularly to ensure a fresh and consistent vibe.</li>
  <li>No Interruptions: Ad-free, non-stop listening for uninterrupted chill sessions.</li>
  <li>Perfect for All Occasions: From background ambiance to focus music or beat-making inspiration, our platform provides the soundtrack for your day.</li>
  <li>Support for Creators: Access beats for personal projects, podcasts, or videos, while supporting independent beatmakers.</li>
</ul>

<p>
  Immerse yourself in the world of laid-back rhythms and old-school textures with our exclusive Lo-Fi Boom Bap Beats. Let the beats take over!
</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>






</div>



{/* <h2 className='pl-4   text-gray-400'>Lo-fi Boom Bap Focus Beats</h2>
<h2 onClick={handleNextTrack} className="text-white">{playCount}</h2>  */}








</div>
 {frontPage ?  <div className='flex justify-center text-white h-screen'><span className="loading text-white loading-ring loading-lg"></span> </div> : 
  

<div className="flex  md:columns-2 ">
<div className='hidden w-32 lg:block'>




<div className="flex h-screen flex-col justify-between  bg-slate-900">
  <div className="px-2 py-6">
    

    <ul className="mt-6 space-y-1">
      <li>
        <a
          href="./"
          className="block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-gray-700"
        ><div className='flex gap-2'><FaHome />Home</div>
          
        </a>
      </li>

      

      


      </ul>
<div>

<a href="./artists" className="btn bg-slate-900 text-gray-500 border-slate-900" ><FaList />Artists</a>
{/* <button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><FaList />Playlist</button> */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
      <div>

      
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><CiSearch />Search</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Info</h3>
    <p className="py-4">The Info is</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>



      
    

<div>    
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><CiCircleInfo />Info</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Info</h3>
    <p className="py-4"></p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</div>
  </div>

  <div className="sticky  inset-x-0 bottom-0 ">
    <a href="#" className="flex items-center gap-2 bg-slate-900 p-4 ">
      
      
      <div className='bg-slate-900'>
        <p class="text-xs">
          <strong className="block text-gray-400 font-medium">Daily Operation</strong>
          <a href="https://develop.dailyoperation.uk">
          <span className="text-gray-400" > dailyoperation.uk </span>
          </a>
        </p>
      </div>
    </a>
  </div>
</div>

</div>
<div className='mx-auto'>



{startedSelection && (
      <div className="flex  h-44 m-6 w-72 md:w-96 bg-slate-500 lg:card-side shadow-xl rounded rounded-xl">
   
  <figure>
    <img className="rounded-lg w-44 h-44"
      src={playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}
      alt="Album" />
  </figure>
  

  
  
  <div className="mx-auto  card-body bg-slate-500 rounded-xl">
  <h2 className="card-title">{playing.title.rendered}</h2>
    <p>{playing._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')}</p>
                
    <div className="card-actions justify-end">
    

      {isSoundPlaying ? <button onClick={handlePause} ><CiPause1 /></button> : <button onClick={reStart}><FaPlay /></button>}
      
    </div>
  </div>
</div>
)}
  
{!startedSelection && ( 
      <div className="flex h-44 m-6 w-72 md:w-96 bg-slate-500 lg:card-side shadow-xl rounded rounded-xl">
   
  <figure>
    <img className="rounded-lg w-44 h-44"
      src="stereo.jpg"
      alt="Album" />
  </figure>
  

  
  
  <div className=" pl-4 card-body bg-slate-500 rounded-xl">
  <h2 className="card-title">Select a track</h2>
  <p className='text-xs '>Click any track below to load</p>
    
                
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
    <div className="mx-6 pt-10 bg-slate-900 grid flex flex-wrap grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {artistDataWP.map(post => (
            <div key={post.id}>
            
            <Image onClick={() => handlePostClick(post)}  className='rounded-lg hover:cursor-pointer shadow-lg' src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text} width={150} height={150}/>
              <h2 className="text-slate-200">{post.title.rendered}</h2>

              <a href={`./${post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.slug : ''
                )).filter(Boolean).join(', ')}`}>
              <p onClick={() => setArtistDisplay(post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')) 
                } className="text-slate-200 font-base text-sm">
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


 <footer className="footer bg-neutral text-neutral-content p-10">
 <div className=''>
        <div className="text-xs">
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
  </>
  );
}
