import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { CheckCheck } from "lucide-react"


const Paymentsuccess = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-20 w-20 top-1/3 absolute border-4 border-blue-500 rounded-full bg-blue-500">
        <CheckCheck size={40} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
        </div>
      <h1 className="text-xl text-center md:text-3xl font-bold">
        Payment Successful
      </h1>
      <Button className="mt-10 p-5 text-xl">
        <Link to="/courses">Explore more Courses</Link>
      </Button>
    </div>
  )
}

export default Paymentsuccess