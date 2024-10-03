"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Image from "next/image";

import {Howl, Howler} from 'howler';
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FaList } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";






export default function Page({ params }) {

  const router = useRouter()
  const { id } = params;

  
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
  const [globalArtistID, setGlobalArtistID] = useState(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [playLimitNum, setPlayLimitNum] = useState(7);
  const [errorMessage, setErrorMessage] = useState("");
  

  const {Howl, Howler} = require('howler');

  

  


  // Fetch the category based on the slug from params
  useEffect(() => {
    fetch(`https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/categories?slug=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setGlobalArtistID(data[0].id); // Set globalArtistID to the fetched category ID
          console.log(`Category ID: ${data[0].id}, Name: ${data[0].name}, Slug: ${data[0].slug}`);
        } else {
          console.log('Category not found');
          

        }
      })
      .catch(error => console.error('Error fetching category by slug:', error));
  }, [id]);



  
// Fetch posts based on globalArtistID when it changes
useEffect(() => {
  if (globalArtistID) {
    fetch(`https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?_embed&per_page=16&categories=${globalArtistID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArtistDataWP(data);
        setPlaying(data[0]); // Start with the first post
        const trackId = data[0].id;
        setTrackPath(`https://develop.dailyoperation.uk/audio/track${trackId}.mp3`);
        setIsLoaded(true);
        setFrontPage(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}, [globalArtistID]);



  

  const handlePostClick = (post) => {
    // checkPlayCount();
    setPlaying(post);
    handlePlay(post);
    setStartedSelection(true);
  };

  const handlePlay = (track) => {
    if (currentSound) {
      currentSound.stop();
      
    }
    
    setPlayCount(prevCount => prevCount + 1);
    // checkPlayCount();
    if (playCount < playLimitNum) {
    
    const trackId = track.id;
    const newTrackPath = `https://develop.dailyoperation.uk/audio/track${trackId}.mp3`;
    console.log(newTrackPath);
    setTrackPath(newTrackPath);
    

    const sound = new Howl({
      src: [newTrackPath],
      html5: true,
      onend: handleNextTrack
    });
    
    setCurrentSound(sound);
    sound.play();
    setIsSoundPlaying(true);
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

    currentSound.pause();
    setIsSoundPlaying(false);
    
  };

  const reStart = () => {
    currentSound.play();
    setIsSoundPlaying(true);
    
  };

  const handlePause = () => {
    if (currentSound) {
      currentSound.pause();  // Pause the sound
      setIsSoundPlaying(false);  // Update state to reflect pause
    }
  };

  const stopAll = () => {
    Howler.unload();
  };

  // const handleTimeLimit = () => {
  //   console
  //   // Show the modal
  //   console.log("pausing");
  //   Howler.unload();
  //   document.getElementById('my_modal_8').showModal();

  // };

  const handleTimeLimit = () => {
    // Pause the music and show modal
    console.log("Pausing music as play limit reached.");
    handlePause();  // Stops all active sounds
    // handleNextTrack();
    document.getElementById('my_modal_8').showModal(); // Display the modal
  };
  
  // const checkPlayCount = () => {
  //   if (playCount >= 5) {  // Limit of 5 plays
  //     handlePause();  // Pause the current track
  //     handleTimeLimit();  // Trigger the modal to ask for continuation
  //   }
  // };

  const resetPlayCount = () => {
    
    setPlayCount(0);
    // setIsSoundPlaying(false);
  };


  

  


  
  

  


  
    
  return (<>

{/* Open the modal using document.getElementById('ID').showModal() method */}

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
   <a href="./"><button className="btn text-2xl bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><FaHome /></button></a>

</div>

   

 





</div>



<h2 className='pl-4   text-gray-400'>Lo-fi Boom Bap Focus Beats</h2>
{/* <h2 className="text-white">{playCount}</h2>
<button className="text-white" onClick={handlePause}>LIMIT</button> */}











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

  {/* Open the modal using document.getElementById('ID').showModal() method */}
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

<div className='text-center text-gray-400'>{errorMessage}</div>
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
    

      {startedSelection && isSoundPlaying ? <button onClick={handleStop} ><CiPause1 /></button> : <button onClick={reStart} ><FaPlay /></button>}
      
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
  </>
  );
}
