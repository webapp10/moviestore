import './App.css';
import { BrowserRouter, Routes, Route, HashRouter as Router } from "react-router-dom";

// Import Pages

import Home from './pages/Home';
import Layout from './NavigationLayout';
import About from './pages/About';
import Movie from './pages/Movie';
import Error404 from './pages/Error404';
function App() {

  return (


    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="movie" element={<Movie />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
