import React from 'react'
import Navbar from '../components/Navbar';
import Button from '../components/decos/Button';
import { ArrowRight } from 'lucide-react';


const Home = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div className='bg-black font-sans min-h-screen'>
    <Navbar/>
    
    {/** Hero section */}
      <div>
        <section className="sm:mt-24 mt-14 flex flex-col items-center justify-center text-center ">
        <div className="max-w-[1200px] sm:px-3">
        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-transparent bg-clip-text tracking-tight">
          On a mission to tidy up your <span className='text-white/70 mt-3'>Github</span>
        </h1>
        </div>
        <div className='items-center md:w-1/2 w-2/3'>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
      Got old projects you don’t need anymore? This tool lets you bulk-delete GitHub repos in just a few clicks. Fast, safe, and super simple.
    </p>
        </div>
    
    <span className='flex items-center justify-center'>
    <Button text="Get Started" icon={ArrowRight} onClick={handleLogin}/>
    </span>
    
    <p className="text-sm text-gray-500 mt-3">OAuth-secured. We never store your data.</p>
  
</section>

      </div>

    </div>
  );
};

export default Home;
