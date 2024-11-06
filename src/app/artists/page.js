// pages/index.js
"use client"

import { useEffect, useState } from 'react';

import { FaHome } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedCards, setExpandedCards] = useState({});

  

  

  

  // Fetch categories and posts
  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        // Fetch posts
        const postRes = await fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?_embed&per_page=16');
        const postData = await postRes.json();

        // Fetch categories
        const categoryRes = await fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/categories');
        const categoryData = await categoryRes.json();

        setPosts(postData);
        setCategories(categoryData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchPostsAndCategories();
  }, []);

  // Organize posts by category
  const getPostsByCategory = (categoryId) => {
    return posts.filter(post => post.categories.includes(categoryId));
  };

  const toggleExpand = (categoryId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId], // Toggle the specific category's expanded state
    }));
  };

  if (loading) {
    return <div className="h-screen text-white">Loading...</div>;
  }

  return (<>
    <div className="w-full">
    
    <div className='flex'>
    <h1 className=' text-3xl pt-2 pl-4 font-semibold text-[#eb761d]'>Daily Operation</h1> 
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <a href="./"><button className="btn text-2xl text-[#eb761d] bg-transparent hover:bg-[#745c4d] hover:border-[#745c4d] border-transparent" ><FaHome /></button></a>

</div>

   


 

 




</div>



<h2 className=" ml-4 text-[#ceb8ae] text-xs">Lo-Fi Boom Bap Beats</h2>
{/* <div className=" ml-4 text-gray-400 font-semibold text-sm">Beta Version</div> */}


    
      <h1 className=" text-3xl pt-2 pl-4 font-semibold text-[#ceb8ae]">Artists</h1>
      {/* https://develop.dailyoperation.uk/streaming/artist_images/artist1.png */}

      <div className="flex flex-wrap justify-center w-full gap-2">
      {categories.map((category) => (

        

        <div className="" key={category.id}>

        <div className="card m-10 bg-base-100 w-72 min-h-96 shadow-xl">
  <figure>
  <img
  src={`https://develop.dailyoperation.uk/streaming/artist_images/artist${category.id}.png`}
  // src={`https://develop.dailyoperation.uk/streaming/artist_images/artist1.png`}
  alt="artist" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-gray-700">{category.name}</h2>
    
        {/* Conditionally render description based on expanded state for the specific card */}
        {!expandedCards[category.id] && (
                    <p className="text-gray-700 text-xs">
                      {category.description.slice(0, 200)}
                    </p>
                  )}
                  {expandedCards[category.id] && (
                    <p className="text-black text-xs">
                      {category.description}
                    </p>
                  )}
                  <div className="text-sm text-gray-400">
                    <button onClick={() => toggleExpand(category.id)}>
                      {expandedCards[category.id] ? "Read less" : "Read more"}
                    </button>
                  </div>

    <p className="text-xs text-gray-200">{category.id}</p>
    <div className="card-actions justify-end">
    <a href={`https://dailyoperation.uk/${category.slug}`}><button  className="btn bg-slate-200 text-xs text-gray-500">Listen</button></a>
    </div>
  </div>
</div>


          
          
          <div >
            
          </div>
        </div>

        
      ))}
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
    </> );
}

