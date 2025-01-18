import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BuyCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // To display success message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/course/preview`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        const selectedCourse = data.courses.find((c) => c._id === courseId); // Find the specific course
        setCourse(selectedCourse);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleBuyCourse = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
      navigate('/user/login'); // Redirect to login if token is not found
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/course/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
        body: JSON.stringify({ courseId }), // Send the courseId in the request body
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Display success message
        setTimeout(() => navigate('/payment-success'), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || 'Failed to purchase the course');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (error) {
    return <p className="text-red-500 px-10 min-h-screen">{error}</p>;
  }

  if (!course) {
    return <p className='px-5'>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen px-10">
      <h1 className="text-xl text-center md:text-3xl font-bold my-5">Buy Course</h1>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold">{course.title}</h2>
        <p className="text-lg">{course.description}</p>
        <p className="text-lg">Price: ${course.price}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBuyCourse}
        >
          Buy Course
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default BuyCourse;
