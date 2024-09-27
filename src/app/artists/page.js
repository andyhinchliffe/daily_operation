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
<h1 className=' text-3xl pt-2 pl-4 font-semibold text-gray-400'>Daily Operation</h1> 
  

<div className="ml-10 ">

   {/* Open the modal using document.getElementById('ID').showModal() method */}
   <a href="./"><button  className="btn text-2xl bg-slate-900 text-gray-500 border-slate-900" ><FaHome /></button></a>

</div>

   


 

 




</div>



<h2 className='pl-4   text-gray-400'>Lo-fi Boom Bap Focus Beats</h2>


    
      <h1 className=" text-3xl pt-2 pl-4 font-semibold text-gray-400">Artists</h1>
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
      <a href="https://www.youtube.com/@dailyoperationuk/videos"><button  className="btn bg-slate-200 text-xs text-gray-500">Listen On YouTube</button></a>
    </div>
  </div>
</div>


          
          
          <div >
            
          </div>
        </div>

        
      ))}
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
    </> );
}
