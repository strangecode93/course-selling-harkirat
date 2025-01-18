import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/course/preview');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract courses array from the response
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        setError('Something went wrong. Please try again later.');
        console.error(error); // Log the error for debugging
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-5">
      <h1 className="text-2xl text-center md:text-5xl font-bold">
        Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : !error ? (
          <p>Loading courses...</p>
        ) : null}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Courses;
