import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import UserLogin from "./pages/UserLogin"
import AdminLogin from "./pages/AdminLogin"
import UserSignup from "./pages/UserSignup"
import MyCourses from "./pages/MyCourses"
import AdminSignup from "./pages/AdminSignup"
import BuyCourse from "./components/BuyCourse"
import Paymentsuccess from "./components/Paymentsuccess"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/mycourses" element={<MyCourses/>}/>
        <Route path="/user/login" element={<UserLogin/>}/>
        <Route path="/user/signup" element={<UserSignup/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/signup" element={<AdminSignup/>}/>
        <Route path="/courses/:courseId" element={<BuyCourse/>}/>
        <Route path="/payment-success" element={<Paymentsuccess/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App