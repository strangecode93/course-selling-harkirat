import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
          setFilteredCourses(data.courses); // Initially show all courses
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

  useEffect(() => {
    if (searchQuery) {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses); // Show all courses if no search query
    }
  }, [searchQuery, courses]);

  return (
    <div className="flex flex-col min-h-screen px-5">
      <h1 className="text-2xl text-center md:text-5xl mt-10 font-bold">
        courses
      </h1>

      {/* Search Bar */}
      <div className="mt-10 mb-8 flex justify-center">
        <input
          type="text"
          className="p-3 px-4 rounded-full bg-zinc-100 outline-none"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
