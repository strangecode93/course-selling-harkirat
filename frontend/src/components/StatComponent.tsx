import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from "recharts";

const StatsComponent = () => {
  const [stats, setStats] = useState([]);
  const [totalFund, setTotalFund] = useState(0);
  const [mostSellingCourses, setMostSellingCourses] = useState([]);
  const [totalPeople, setTotalPeople] = useState(0);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin/login");
      }
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/course/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data.stats;

      // Safeguard against undefined or empty data
      if (!data || !Array.isArray(data)) {
        console.error("Invalid data format received");
        return;
      }

      setStats(data);

      // Calculate total monitoring fund generated
      const fund = data.reduce((acc, course) => {
        const price = parseFloat(course.price) || 0;
        const buyers = parseInt(course.buyers) || 0;
        return acc + price * buyers;
      }, 0);
      setTotalFund(fund);

      // Determine most selling courses
      const sortedCourses = [...data].sort(
        (a, b) => (b.buyers || 0) - (a.buyers || 0)
      );
      setMostSellingCourses(sortedCourses.slice(0, 3)); // Top 3 courses

      // Calculate total unique people engaged
      const people = data.reduce(
        (acc, course) => acc + (parseInt(course.buyers) || 0),
        0
      );
      setTotalPeople(people);
    } catch (error) {
      console.error(
        "Error fetching stats:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-5 min-h-screen">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">Course Stats Overview</h2>
        <Link to="/admin/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>

      {/* Summary */}
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold text-lg">Total Monitoring Fund</h3>
          <p className="text-2xl font-semibold text-green-500">
            ${totalFund.toFixed(2)}
          </p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold text-lg">Most Selling Courses</h3>
          <ul>
            {mostSellingCourses.map((course) => (
              <li key={course.courseId || course._id} className="text-blue-500">
                {course.title || "Unknown Course"} ({course.buyers || 0} buyers)
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold text-lg">Total People Engaged</h3>
          <p className="text-2xl font-semibold text-green-500">
            +{totalPeople}
          </p>
        </div>
      </div>

      {/* Course-wise Details */}
      <h3 className="text-xl font-bold mb-3">Course-wise Details</h3>
      <div className="grid gap-3">
        {stats.map((course) => (
          <div
            key={course.courseId || course._id}
            className="p-3 border rounded"
          >
            <h4 className="font-bold">{course.title || "Unknown Course"}</h4>
            <p>${parseFloat(course.price).toFixed(2) || "0.00"} per course</p>
            <p>{parseInt(course.buyers) || 0} Buyers</p>
            <p>
              Total Revenue: $
              {(
                parseFloat(course.price) * parseInt(course.buyers) || 0
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      

      {/* Revenue Chart */}
      <h3 className="text-xl font-bold mt-5 mb-3">Revenue Generated</h3>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart
            data={stats}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalRevenue" fill="#8884d8" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Line Chart */}
      <div className="w-full h-96">
        <h4 className="text-lg font-semibold mb-3">User Engagement (Buyers)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={stats}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="buyers"
              stroke="#82ca9d"
              name="Buyers"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsComponent;
