import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./home/Home"
import Footer from "./components/footer/Footer"
import About from "./about/About";
import Contact from "./contact/Contact"
import Signup from "./signup/Signup"
import CreateBlog from "./Admin/blog/CreateBlog";
import Login from "./login/Login";
import ScrollButton from "./components/scroll/ScrollButton";
import ChatWidget from "./components/chatWgt/ChatWidget";
import BlogPage from "./components/blog/Blogpage";
import JobApplication from "./components/applicatn/JobApplication";
import VisaApplication from "./components/applicatn/VisaApplication";
import AddJob from "./Admin/form/AddJob";
import AddVisa from "./Admin/form/AddVisa";


function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/application/job" element={<JobApplication />} />
          <Route path="/application/visa" element={<VisaApplication />} />
          <Route path="/admin/add/job" element={<AddJob />} />
          <Route path="/admin/add/visa" element={<AddVisa />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/create/blog" element={<CreateBlog />} />
        </Routes>
        <Footer />
        <ScrollButton />
        <ChatWidget />
      </Router>
    </div>
  )
}

export default App
