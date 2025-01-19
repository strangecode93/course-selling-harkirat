import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    courseId: null, // Used for updates
  });

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/admin/login'); // Redirect to login if the user is not authenticated
        return;
      }
      const response = await axios.get("http://localhost:3000/api/v1/admin/course/bulk", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const isUpdate = !!courseForm.courseId;
    const url = isUpdate
      ? "http://localhost:3000/api/v1/admin/course"
      : "http://localhost:3000/api/v1/admin/course";

    try {
      const response = await axios({
        method: isUpdate ? "PUT" : "POST",
        url,
        headers: { Authorization: `Bearer ${token}` },
        data: courseForm,
      });

      console.log(isUpdate ? "Course updated successfully!" : "Course created successfully!");
      fetchCourses();
      setCourseForm({ title: "", description: "", imageUrl: "", price: "", courseId: null });
    } catch (error) {
      console.log(isUpdate ? "Failed to update course." : "Failed to create course.");
    }
  };

  const handleEdit = (course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      price: course.price,
      courseId: course._id,
    });
  };

  return (
    <div className="p-5 min-h-screen">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <Link to="/admin/stats">
      <Button className="font-medium">
        Stats
      </Button>
      </Link>
      </div>
      <form onSubmit={handleSubmit} className="mb-5 space-y-3">
        <input
          type="text"
          name="title"
          value={courseForm.title}
          onChange={handleInputChange}
          placeholder="Course Title"
          required
          className="w-full border p-2"
        />
        <textarea
          name="description"
          value={courseForm.description}
          onChange={handleInputChange}
          placeholder="Course Description"
          required
          className="w-full border p-2"
        ></textarea>
        <input
          type="text"
          name="imageUrl"
          value={courseForm.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
          className="w-full border p-2"
        />
        <input
          type="number"
          name="price"
          value={courseForm.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="w-full border p-2"
        />
        <button type="submit" className="bg-black font-medium text-white py-2 px-4 rounded">
          {courseForm.courseId ? "Update Course" : "Create Course"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-3">Courses</h2>
      <div className="grid gap-3">
        {courses.map((course) => (
          <div key={course._id} className="p-3 border rounded">
            <h3 className="font-bold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="text-gray-600">${course.price}</p>
            <button
              onClick={() => handleEdit(course)}
              className="bg-yellow-500 text-white py-1 px-2 rounded mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
