import React, { useEffect,
   useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Loader from "./components/Loader";
import { useAuthStore } from "./store/auth.store";
import ProtectedRoute from "./components/ProtectedRoute";
 
// 1. Import the RateLimitBanner component
import { RateLimitBanner } from "./components/RateLimitBanner";

function App() {

  const [loading, setLoading] = useState(true);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  useEffect(() => {
    const doCheck = async () => {
      // Check for token in URL (fallback for cross-site cookie blocking)
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        localStorage.setItem("token", token);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      await checkAuth();
      setLoading(false);
    };
    doCheck();
  }, [checkAuth]);

  if (loading) return <Loader />


  return ( 
    <>
    {/* 2. Placing the banner inside the root fragment wrapper */}
    <RateLimitBanner />
     
     {/* 3. The rest of your app's routing and components */}
         <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
        />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
