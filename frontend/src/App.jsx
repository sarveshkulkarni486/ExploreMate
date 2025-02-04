import { useEffect, useState } from 'react'
import Loading from './components/loading';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Tours from './components/Tours';
import Guides from './components/Guides';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=> {
      setLoading(false);
    }, 3000);
  }, []);


  return (
    <>
      {loading ? (<Loading /> ): (
        <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/About"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/Tours"
            element={
              <>
                <Navbar />
                <Tours />
              </>
            }
          />
          <Route
            path="/Guides"
            element={
              <>
                <Navbar />
                <Guides />
              </>
            }
          />
          <Route
            path="/Contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          {/* Login route without Navbar */}
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
      )}
      
    </>
  )
}

export default App
