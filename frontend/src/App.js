import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Categories from './pages/Categories/Categories';
import Questions from './pages/Questions/Questions';
import MovieNews from './pages/MovieNews/MovieNews';
import MovieCategory from './pages/MovieReviews/MovieCategory/MovieCategory';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token")); //Syncing toke in when user logs in
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));  //Saving user in localStorage 
    }
  }, [user]); 

  // For monitoring changes in localStorage for token updates
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Memoize ProtectedRoute for performance
  const ProtectedRoute = useMemo(() => {
    return ({ children }) => (token ? children : <Navigate to="/" replace />);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home user={user} />
            </ProtectedRoute>
          } 
        >
          {/* <Route path='dashboard' element={<Dashboard />} /> */}
          <Route path='categories' element={<Categories />} />
          <Route path='questions' element={<Questions />} />
          <Route path='reviews' element={<MovieCategory />} />
          <Route path='news' element={<MovieNews />} />
        </Route>         
         
      </Routes>
    </Router>
  );
}

export default App;
