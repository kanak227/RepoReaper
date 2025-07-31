import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";

function App() {

  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const timer = setTimeout(() =>{
      setLoading(false);
    } , 2000);
    return () => clearTimeout(timer)
  } , []);

  if (loading) return <Loader />


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
