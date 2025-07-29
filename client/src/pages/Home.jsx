import React from 'react'

const Home = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleLogin}
        className="px-6 py-3 text-white bg-black rounded-lg hover:opacity-90 transition"
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Home;
