import { useEffect, useState } from 'react'
import Loading from './components/Loading';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Tours from './components/Tours';
import Guides from './components/Guides';
import BookNow from './components/BookNow';
import GuideRegister from './components/GuideRegistration';
import GuideLogin from './components/GuideLogin';
import GuideDashboard from './components/GuideDashboard';
import GuideProfile from './components/GuideProfile';
import PaymentPage from './components/Payment';
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
          <Route path="/map" element={<BookNow />} />
          <Route path="/guideregister" element={<GuideRegister />} />
          <Route path="/guidelogin" element={<GuideLogin />}/>
          <Route path="/guidedash" element={<GuideDashboard />} />
          <Route path="/guideprof" element={<GuideProfile />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
      )}
      
    </>
  )
}

export default App
