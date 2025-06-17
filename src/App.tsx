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
import Dashboard from "./Admin/Dashboard/Dashboard";
import AdminLayout from "./Admin/Dashboard/AdminLayout";
import ServiceDetail from "./servic/ServiceDetail";
import ScrollToTop from "./components/scroll/ScrollToTop";
import ApplicationViewer from "./components/applicatn/ApplicationViewer";
import AdminApplicationManager from "./Admin/Dashboard/AdminApplicationManager";
import AvailableJobs from "./job/AvailableJobs";


function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/blogs" element={<><Navbar /><BlogPage /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/blogs/:id" element={<><Navbar /><BlogPage /><Footer /><ScrollButton /><ChatWidget /></>} />
          <Route path="/services/:slug" element={<><Navbar /><ServiceDetail /><ScrollButton /><ChatWidget /><Footer /></>} />
          <Route path="/application/job" element={<><Navbar /><JobApplication /><ScrollButton /><ChatWidget /><Footer /></>} />
          <Route path="/application/visa" element={<><Navbar /><VisaApplication /><ScrollButton /><ChatWidget /><Footer /></>} />
          <Route path="/myapplications" element={<><Navbar /><ApplicationViewer /><ScrollButton /><ChatWidget /><Footer /></>} />
          <Route path="/opportunities" element={<><Navbar /><AvailableJobs /><ScrollButton /><ChatWidget /><Footer /></>} />

          {/* Admin Routes (with shared layout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create/blog" element={<CreateBlog />} />
            <Route path="add/job" element={<AddJob />} />
            <Route path="add/visa" element={<AddVisa />} />
            <Route path="/admin/applications" element={<AdminApplicationManager />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
