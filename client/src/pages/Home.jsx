import React from 'react'
import Navbar from '../components/Navbar';
import Button from '../components/decos/Button';
import { ArrowRight, Trash2, Archive, Lock, Zap, Shield, FileDown, ServerOff, Code, Github, Star, StarOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { parentVariants , childVariants } from '../animations/animation';
import { useAuthStore } from '../store/auth.store';
import { useAppStore } from '../store/app.store';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, desc, mode }) => (
  <div className={`flex flex-col p-6 rounded-2xl bg-gray-900/40 border border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(${mode === 'reaper' ? '59,130,246' : '234,179,8'},0.15)] ${mode === 'reaper' ? 'hover:border-blue-500/50' : 'hover:border-yellow-500/50'}`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-colors ${mode === 'reaper' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc, mode }) => (
  <div className="flex flex-col items-center text-center p-6 relative">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 z-10 shadow-lg transition-colors duration-500 border ${mode === 'reaper' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-800 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]'}`}>
      {number}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

const Home = () => {
  const { loginwithGithub } = useAuthStore();
  const { mode } = useAppStore();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    loginwithGithub();
  };

  return (
    <div className='min-h-screen bg-black relative overflow-hidden'>
      {/* Radial Background Glow - extended behind navbar */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[700px] opacity-30 pointer-events-none">
        <div className={`absolute inset-0 blur-[120px] rounded-[100%] transition-colors duration-1000 ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600' : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600'}`} />
      </div>

      <div className="relative z-10">
        <Navbar/>
        
        {/* Hero section */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={parentVariants}
          className="pt-20 pb-20 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div variants={childVariants} className="max-w-[900px] mx-auto">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight text-white">
              {mode === 'reaper' ? 'Sweep your ' : 'Unstar the '}<span className={`text-transparent bg-clip-text drop-shadow-sm transition-colors duration-1000 ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500' : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500'}`}>{mode === 'reaper' ? 'GitHub' : 'Noise'}</span> {mode === 'reaper' ? 'clean.' : 'away.'}
            </h1>
          </motion.div>
          
          <motion.div variants={childVariants} className='max-w-[600px] mx-auto'>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
              {mode === 'reaper' ? 'Got old projects gathering dust? RepoReaper is the fastest way to bulk-delete, archive, or hide repositories in just a few clicks.' : 'Starred too many repositories over the years? StarSweeper is the fastest way to bulk-unstar repositories in just a few clicks.'}
            </p>
          </motion.div>
      
          <motion.div variants={childVariants} className='flex flex-col items-center justify-center gap-5'>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="https://github.com/kanak227/RepoReaper" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-sm sm:text-base flex gap-2 items-center px-5 py-3 sm:px-6 sm:py-3 rounded-xl bg-transparent text-white tracking-normal border border-yellow-600/50 backdrop-blur-md shadow-[inset_0_0_10px_rgba(234,179,8,0.2)] transition-all duration-300 hover:scale-[0.95] hover:text-yellow-50 hover:border-yellow-500 hover:shadow-[inset_0_0_18px_rgba(234,179,8,0.4)] group font-medium">
                <Star className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" /> Star on GitHub
              </a>
              <Button text={isLoggingIn ? "Redirecting..." : mode === 'reaper' ? "Start Reaping" : "Start Sweeping"} icon={ArrowRight} onClick={handleLogin} disabled={isLoggingIn}/>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4"/> OAuth-secured. We never store your code.
            </p>
          </motion.div>

          {/* Animated Mock UI */}
          <motion.div 
            variants={childVariants}
            className="mt-20 w-full max-w-[900px] mx-auto relative hidden md:block"
          >
            {/* Fade out bottom of the mock UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none h-full w-full rounded-2xl" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* Mock Card 1 */}
              <div className="p-4 rounded-xl bg-black/50 border border-gray-800 flex justify-between items-start shadow-inner">
                <div className="text-left">
                  <h4 className="text-white font-semibold">abandoned-project-2018</h4>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> JavaScript <span className="ml-2">2.4 MB</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg border ${mode === 'reaper' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                  {mode === 'reaper' ? <Trash2 className="w-4 h-4"/> : <StarOff className="w-4 h-4"/>}
                </div>
              </div>

              {/* Mock Card 2 */}
              <div className="p-4 rounded-xl bg-black/50 border border-gray-800 flex justify-between items-start shadow-inner">
                <div className="text-left">
                  <h4 className="text-white font-semibold">old-hackathon-api</h4>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Python <span className="ml-2">15.1 MB</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg border ${mode === 'reaper' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                  {mode === 'reaper' ? <Archive className="w-4 h-4"/> : <StarOff className="w-4 h-4"/>}
                </div>
              </div>

              {/* Mock Card 3 */}
              <div className="p-4 rounded-xl bg-black/50 border border-gray-800 flex justify-between items-start shadow-inner">
                <div className="text-left">
                  <h4 className="text-white font-semibold">embarrassing-code</h4>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span> C++ <span className="ml-2">400 KB</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg border ${mode === 'reaper' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                  {mode === 'reaper' ? <Lock className="w-4 h-4"/> : <StarOff className="w-4 h-4"/>}
                </div>
              </div>
              
              {/* Mock Card 4 */}
              <div className="p-4 rounded-xl bg-black/50 border border-gray-800 flex justify-between items-start shadow-inner">
                <div className="text-left">
                  <h4 className="text-white font-semibold">hello-world-test</h4>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span> HTML <span className="ml-2">12 KB</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg border ${mode === 'reaper' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                  {mode === 'reaper' ? <Trash2 className="w-4 h-4"/> : <StarOff className="w-4 h-4"/>}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Feature Section */}
        <section className="py-24 px-4 max-w-[1200px] mx-auto relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why use {mode === 'reaper' ? 'RepoReaper?' : 'StarSweeper?'}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">The ultimate tool for developers who want a clean digital footprint.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard 
              mode={mode}
              icon={Zap}
              title="Lightning Fast"
              desc="Sort thousands of repositories by size or date. Select multiple projects and wipe them out or archive them instantly."
            />
            <FeatureCard 
              mode={mode}
              icon={Archive}
              title="Safe Archiving"
              desc="Not ready to completely delete your work? Bulk archive repositories to safely tuck them away as read-only."
            />
            <FeatureCard 
              mode={mode}
              icon={Lock}
              title="Privacy First"
              desc="Easily bulk-convert public repositories to private. Hide your embarrassing code without losing the history."
            />
            <FeatureCard 
              mode={mode}
              icon={FileDown}
              title="Data Exports"
              desc="Before doing a massive sweep, safely download a CSV export containing the metadata of all your repositories."
            />
            <FeatureCard 
              mode={mode}
              icon={ServerOff}
              title="Stateless & Secure"
              desc="We don't use a database. We never store your tokens, your repositories, or your code. Everything happens in-memory."
            />
            <FeatureCard 
              mode={mode}
              icon={Code}
              title="Open Source"
              desc="Don't trust us? Read the code. RepoReaper is completely open-source and ready for community contributions."
            />
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 px-4 max-w-[1200px] mx-auto border-t border-gray-900 relative">
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none">
             <div className={`absolute inset-0 blur-[150px] rounded-full transition-colors duration-1000 ${mode === 'reaper' ? 'bg-blue-600' : 'bg-yellow-500'}`} />
           </div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How it works</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Three simple steps to a cleaner GitHub profile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Connecting line for desktop */}
            <div className={`hidden md:block absolute top-14 left-[16%] right-[16%] h-1 z-0 transition-colors duration-1000 ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900' : 'bg-gradient-to-r from-yellow-900 via-orange-900 to-yellow-900'}`}></div>
            
            <StepCard 
              mode={mode}
              number="1"
              title="Connect GitHub"
              desc="Login with GitHub OAuth. We only ask for the permissions strictly necessary to manage your repositories."
            />
            <StepCard 
              mode={mode}
              number="2"
              title="Filter & Sort"
              desc="Use our dashboard to sort your repositories by size, date, or name to find the ones you no longer need."
            />
            <StepCard 
              mode={mode}
              number="3"
              title="Sweep it Clean"
              desc={mode === 'reaper' ? "Select multiple repositories and click Delete, Archive, or Make Private. We handle the rest instantly." : "Select multiple starred repositories and click Unstar. We'll instantly clean up your stars list."}
            />
          </div>
        </section>

        {/* Open Source CTA */}
        <section className="py-24 px-4 max-w-[1000px] mx-auto relative z-20">
          <div className={`w-full rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-colors duration-500 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden ${mode === 'reaper' ? 'hover:border-blue-500/30' : 'hover:border-yellow-500/30'}`}>
            {/* Glow effect inside the card */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 blur-[100px] pointer-events-none transition-colors duration-1000 ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'}`}></div>
            
            <div className="text-center md:text-left z-10 flex-1">
              <h2 className="text-3xl font-bold text-white mb-3">Wanna contribute?</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto md:mx-0">Got a cool idea for an additional feature, or just want to support the project? RepoReaper is fully open-source!</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 z-10 w-full md:w-auto">
              <a href="https://github.com/kanak227/RepoReaper" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800/50 backdrop-blur-md hover:bg-gray-700/80 border border-gray-700 hover:border-gray-500 text-white font-medium transition-all shadow-sm">
                <Github className="w-5 h-5"/> GitHub
              </a>
              <a href="https://github.com/kanak227/RepoReaper" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md border font-medium transition-all ${mode === 'reaper' ? 'bg-blue-600/90 hover:bg-blue-500 border-blue-500/50 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-yellow-500/90 hover:bg-yellow-400 border-yellow-400/50 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'}`}>
                <Star className="w-5 h-5"/> Star Repo
              </a>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  );
};

export default Home;
