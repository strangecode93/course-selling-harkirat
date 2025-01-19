import { Github } from "lucide-react"


const Footer = () => {
  return (
    <div className="p-5 flex items-center justify-between">
        <h1>designed & developed by @somil</h1>
        <div className="flex gap-5">
          <a href="https://github.com/strangecode93/course-selling-harkirat" target="_blank"><Github/></a>
        </div>
    </div>
  )
}

export default Footer