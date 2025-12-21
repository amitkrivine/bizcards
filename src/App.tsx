import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from './components/Register';
import AddCard from './components/AddCard';
import Login from './components/Login';
import About from './components/About';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import MyCards from './components/MyCards';
import UserProfile from './components/UserProfile';
import ViewCard from './components/ViewCard';
import LikedCards from './components/LikedCards';
import EditCard from './components/EditCard';
import Sandbox from './components/Sandbox';

export const SiteTheme = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const SearchContext = createContext({
  searchText: "",
  setSearchText: (text: string) => {},
});



function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [searchText, setSearchText] = useState("");

  return (<>
    <SiteTheme.Provider value={{ darkMode, toggleDarkMode }}>
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        <div className={darkMode ? "app dark" : "app light"} style={{minHeight: "100vh"}}>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/new-card' element={<AddCard />} />
              <Route path='/my-cards' element={<MyCards />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/card-details/:cardId' element={<ViewCard/>} />
              <Route path='/edit-card/:cardId' element={<EditCard/>} />
              <Route path="/favorites" element={<LikedCards />} />
              <Route path='/sandbox' element={<Sandbox />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </SearchContext.Provider>
    </SiteTheme.Provider>
  </>);
}

export default App;
