import { Github, Linkedin } from "lucide-react"


const Footer = () => {
  return (
    <div className="p-5 flex items-center justify-between">
        <h1>designed & developed by @somil</h1>
        <div className="flex gap-5">
            <Github/>
            <Linkedin/>
        </div>
    </div>
  )
}

export default Footer