import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // Function to check login status based on the token
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  };

  // Check login status on component mount
  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes to auto-update login state
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLogin(false); // Update state
    navigate("/user/login"); // Redirect to login
  };

  const handleSelectChange = (value: string) => {
    if (value === "user") {
      navigate("/user/login");
    } else if (value === "admin") {
      navigate("/admin/login");
    }
  };

  return (
    <div className="flex justify-between items-center p-2 md:p-5">
      <div className="text-xl md:text-3xl font-bold">
        <Link to="/">coursehub.</Link>
      </div>
      <div className="flex gap-2 md:gap-5 font-medium text-sm md:text-lg items-center">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/mycourses">My Courses</Link>
        {isLogin ? (
          <Button onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Login" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default Navbar;
