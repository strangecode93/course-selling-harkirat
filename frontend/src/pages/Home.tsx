
import { Link } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Testimonial } from "@/components/Testimonial"
import { OrbitingCirclesDemo } from "@/components/Orbithero"
import { AvatarCirclesDemo } from "@/components/AvatarCircels"
import RetroGrid from "@/components/ui/retro-grid";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { ChevronRight } from "lucide-react"
import { BentoDemo } from "@/components/BentoGrid"



const Home = () => {
  return (
    <>
    {/* main  */}
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* <h1 className="text-5xl text-center md:text-7xl font-bold">
        Welcome to coursehub
      </h1> */}
      <OrbitingCirclesDemo/>
      <Link to="/courses">
      <AnimatedShinyText
       className="inline-flex items-center justify-center px-4 py-1 border rounded transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Explore Courses</span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
        </Link>
    </div>

    
    

    {/* preview  */}
    {/* <div className="mx-10 md:mx-40 bg-black my-10">
      <Safari
        url="magicui.design"
        className="size-full"
        imageSrc="https://images.unsplash.com/photo-1699885960867-56d5f5262d38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJlYWN0fGVufDB8fDB8fHww"
      />
    </div> */}


    {/* payment preview  */}


    {/* bento  */}
    <h1 className="text-2xl text-center md:text-4xl font-bold mb-20">About</h1>
    <div className="mx-10 md:mx-40 mb-20">
    <BentoDemo/>
    </div>


    {/* accordina  */}
    <div className="mx-10 md:mx-40 my-5">
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>


    {/* testimonial  */}
    <h1 className="text-2xl text-center md:text-4xl font-bold mt-20">Testimonials</h1>
    <Testimonial />

    {/* avatar circles  */}
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
    <div className="flex items-center justify-center py-5">
      <div className="bg-black p-5 rounded-full">
    <AvatarCirclesDemo/>
      </div>
    </div>
 
      <RetroGrid />
    </div>
    
    </>
  )
}

export default Home