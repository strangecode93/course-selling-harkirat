import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MyCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const token = localStorage.getItem('token'); // Ensure consistent key usage
      if (!token) {
        navigate('/user/login'); // Redirect to login if the user is not authenticated
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/v1/user/purchases', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch purchased courses.');
        }

        const data = await response.json();
        setCourses(data.coursesData || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [navigate]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-2xl md:text-5xl font-bold text-center mb-6 mt-10">my courses</h1>
      {courses.length === 0 ? (
        <p className="text-center">You have not purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-md border cursor-pointer p-4 flex flex-col items-center"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>
              <p className="text-md font-semibold mt-2">Price: ${course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
