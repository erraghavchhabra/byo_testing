import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Work from "./pages/work";
import './App.css';
 import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "./components/Footer";
import Clients from "./pages/allClients";
import Services from "./pages/allServices";
import About from "./pages/about";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/privacy";
import TermsConditions from "./pages/TermsConditions";
import WorkDetail from "./pages/workDetail";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/work-detail/:title" element={<WorkDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
