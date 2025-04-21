// import logo from './logo.svg';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './pages/Movie';
import { useState } from 'react';
import Header from './pages/Header';
import Moviedetail from './pages/Moviedetail';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/movie' element={<Movie searchQuery={searchQuery}/>}/>
        <Route path='//movie/:id' element={<Moviedetail/>}/>  {/* detail page */}
    
      </Routes>
    </div>
  );
}

export default App;
