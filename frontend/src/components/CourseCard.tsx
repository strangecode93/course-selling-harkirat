import { Link } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white p-4 rounded-md border">
      <h2 className="text-2xl font-bold">{course.title}</h2>
      <p className="text-lg">{course.description}</p>
      <p className="text-lg">Price: ${course.price}</p>
      <Link to={`/courses/${course._id}`}>
        <button className="bg-black text-white font-bold py-2 px-4 mt-5 rounded">
          Buy Course
        </button>
      </Link>
    </div>
  );
};

export default CourseCard;
