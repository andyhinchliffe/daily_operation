"use client"

import { useState, useEffect } from 'react';

import Image from "next/image";
import Link from 'next/link';

import {Howl, Howler} from 'howler';
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FaList } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import CookieConsent from "react-cookie-consent";
import { FaShuffle } from "react-icons/fa6";
// import AdBanner from "./components/AdBanner";
import { PiVinylRecord } from "react-icons/pi";
import { FaRadio } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";








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
    fetch(`https://dailyoperation.uk/audio/wp-json/wp/v2/posts?_embed&per_page=${numToLoad}`, {
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
    // setTrackPath(`https://develop.dailyoperation.uk/audio/track${trackId}.mp3`)
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
      // const newTrackPath = `https://dailyoperation.sbs/audio/audio/track${trackId}.mp3`;
      const newTrackPath = track.mp3_url;
      console.log(newTrackPath);
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


    <main className="bg-[#0f0e0e] text-[#e2dcd7] min-h-screen font-sans">
      {/* Cookie Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Okay"
        cookieName="dailyOperationCookie"
        style={{ background: "#1d1c1a" }}
        buttonStyle={{ background: "#ff914d", color: "white", fontSize: "14px", borderRadius: "6px" }}
        expires={150}
      >
        This website uses cookies for a better experience.{' '}
        <a href="./cookie-policy" className="underline">Learn more</a>
      </CookieConsent>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#1d1c1a] shadow">
        <h1 className="text-xl font-semibold text-[#ff914d] tracking-tight">Daily Operation</h1>
        <nav className="flex space-x-4 text-xl">
          <button
            className={`p-2 rounded-md transition ${inShuffleMode ? 'bg-[#332f2d]' : 'hover:bg-[#332f2d]'} text-[#ff914d]`}
            onClick={handleShuffleMode}
          >
            <FaShuffle />
          </button>
          <button className="p-2 rounded-md hover:bg-[#332f2d] text-[#ff914d]" onClick={() => document.getElementById('modalSearch').showModal()}>
            <CiSearch />
          </button>
          <button className="p-2 rounded-md hover:bg-[#332f2d] text-[#ff914d]" onClick={() => document.getElementById('modalInfo').showModal()}>
            <CiCircleInfo />
          </button>
        </nav>
      </header>

      {/* Intro or Main Section */}
      {frontPage ? (
        <section className="flex justify-center items-center min-h-screen">
          <div className="bg-[#1d1c1a] shadow-xl rounded-xl overflow-hidden w-full max-w-sm">
            <Image
              src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80"
              alt="Cover"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-[#ff914d]">Daily Operation</h2>
              <p className="text-sm mt-1 text-[#e2dcd7]">Lo Fi, Boom Bap & chilled beats</p>
              {!isLoaded ? (
                <span className="loading loading-ring loading-lg mt-4"></span>
              ) : (
                <button
                  className="mt-4 p-3 rounded-full bg-[#ff914d] text-white hover:bg-[#cc7440] transition"
                  onClick={() => setFrontPage(false)}
                >
                  <PiVinylRecord size={20} />
                </button>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="p-6">
          {/* Current Track */}
          {startedSelection ? (
            <div className="max-w-xl mx-auto flex rounded-lg overflow-hidden bg-[#2c2a29] shadow-md">
              <Image
                src={playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                alt="Album"
                width={176}
                height={176}
                className="object-cover w-44 h-44"
              />
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h2 className="text-lg font-semibold text-[#ff914d]">{playing.title.rendered}</h2>
                  <p className="text-sm text-[#b3aaa4]">
                    {playing._embedded['wp:term'][0].map(term => term.taxonomy === 'category' ? term.name : '').filter(Boolean).join(', ')}
                  </p>
                </div>
                <div className="mt-3">
                  {isSoundPlaying ? (
                    <button onClick={handlePause}><CiPause1 size={24} /></button>
                  ) : (
                    <button onClick={reStart}><FaPlay size={24} /></button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl">Select a track</p>
              <p className="text-sm text-[#b3aaa4]">Click any track or enable shuffle mode</p>
            </div>
          )}

          {/* Track Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-10">
            {artistDataWP.map(post => (
              <div key={post.id} className="text-center">
                <Image
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                  alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text}
                  width={150}
                  height={150}
                  className="rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => handlePostClick(post)}
                />
                <h2 className="mt-2 text-sm text-[#ff914d] font-medium">{post.title.rendered}</h2>
                <a
                  href={`./${post._embedded['wp:term'][0].map(term => term.taxonomy === 'category' ? term.slug : '').filter(Boolean).join(',')}`}
                  className="text-xs text-[#b3aaa4] hover:underline"
                >
                  {post._embedded['wp:term'][0].map(term => term.taxonomy === 'category' ? term.name : '').filter(Boolean).join(', ')}
                </a>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {numToLoad < maxDisplayNum && (
            <div className="flex justify-center mt-10">
              <button className="px-4 py-2 rounded bg-[#ff914d] text-white hover:bg-[#cc7440] transition" onClick={handleShowMore}>Load more</button>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#1d1c1a] text-[#a29b95] text-center text-sm p-6 mt-12">
        <p className="font-semibold text-[#ff914d] text-base">Daily Operation</p>
        <p className="text-xs">Lo-fi, Boom Bap & chilled beats platform</p>
        <p className="text-xs">dailyoperation.uk</p>
      </footer>

      {/* Modals */}
      <dialog id="modalSearch" className="modal">
        <div className="modal-box bg-[#e2dcd7] text-black">
          <h3 className="font-semibold text-lg">Search</h3>
          <p className="py-4 text-sm">Search is coming soon.</p>
          <form method="dialog" className="modal-action">
            <button className="btn bg-[#ff914d] text-white">Close</button>
          </form>
        </div>
      </dialog>

      <dialog id="modalInfo" className="modal">
        <div className="modal-box bg-[#f4f1ed] text-black">
          <h3 className="font-semibold text-lg">Info</h3>
          <p className="mb-4 text-sm">
            Discover curated Lo-Fi, Boom Bap & chilled beats playlists for your vibe.
          </p>
          <ul className="list-disc ml-5 text-sm space-y-1">
            <li>Ad-free listening</li>
            <li>High quality audio</li>
            <li>Backed by creators</li>
            <li>Continuous play</li>
          </ul>
          <a href="./faq" className="text-[#ff914d] underline inline-block mt-4">Read our FAQ</a>
          <form method="dialog" className="modal-action mt-6">
            <button className="btn bg-[#ff914d] text-white">Close</button>
          </form>
        </div>
      </dialog>
    </main>
    </>
  )
}
