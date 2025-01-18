import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl text-center md:text-7xl font-bold">
        Welcome to coursehub
      </h1>
      <Button className="mt-10 p-5 text-xl">
        <Link to="/courses">Explore Courses</Link>
      </Button>
    </div>
    </>
  )
}

export default Home