import React from 'react'
import Navbar from '../components/Navbar';
import Button from '../components/decos/Button';
import { ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { parentVariants , childVariants } from '../animations/animation';
import { useAuthStore } from '../store/auth.store';
import Footer from '../components/Footer';


const Home = () => {
  const { loginwithGithub } = useAuthStore();
  const handleLogin = () => {
    loginwithGithub();
  };

  return (
    <div className=' min-h-[100vh]'>
    <Navbar/>
    
    {/** Hero section */}
      <div>
        <motion.section 
        initial="hidden"
        animate="show"
        variants={parentVariants}
        className="sm:mt-24 mt-14 flex flex-col items-center justify-center text-center ">

        <motion.div 
        variants={childVariants}  
        className="max-w-[1200px] sm:px-3">
        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-400 text-transparent bg-clip-text tracking-tight">
          On a mission to tidy up your <span className='text-white/70 mt-3'>Github</span>
        </h1>
        </motion.div>
        <motion.div
        variants={childVariants} 
        className='items-center md:w-1/2 w-2/3'>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
      Got old projects you don’t need anymore? This tool lets you bulk-delete GitHub repos in just a few clicks. Fast, safe, and super simple.
    </p>
        </motion.div>
    
    <motion.div
    variants={childVariants} 
    className='flex items-center justify-center'>
    <Button text="Get Started" icon={ArrowRight} onClick={handleLogin}/>
    </motion.div>
    
    <motion.p 
    variants={childVariants} 
    className="text-sm text-gray-500 mt-3">OAuth-secured. We never store your data.</motion.p>
  
</motion.section>

      </div>
      <Footer/>

    </div>
  );
};

export default Home;
