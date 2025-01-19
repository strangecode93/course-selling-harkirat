import {
    InputIcon,
  } from "@radix-ui/react-icons";
  
  import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BarChartIcon, PlusCircleIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
  
  const features = [
    {
      Icon: InputIcon,
      name: "Search Courses",
      description: "Easily search for courses by category, instructor, or keywords.",
      Link: "/courses",
      cta: "Start Searching",
      background: (
        <img
          src="/assets/search-background.svg"
          alt="Search Background"
          className="absolute -right-20 -top-20 opacity-60"
        />
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: ShoppingCartIcon,
      name: "Buy Courses",
      description:
        "Purchase the best courses to learn new skills and advance your career.",
      href: "/courses",
      cta: "Explore Courses",
      background: (
        <img
          src="/assets/buy-background.svg"
          alt="Buy Background"
          className="absolute -right-20 -top-20 opacity-60"
        />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: UserIcon,
      name: "Login & Logout",
      description: "Easily switch between user and admin roles with a secure login.",
      href: "/user/login",
      cta: "Sign In",
      background: (
        <img
          src="/assets/login-background.svg"
          alt="Login Background"
          className="absolute -right-20 -top-20 opacity-60"
        />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: PlusCircleIcon,
      name: "Create & Manage Courses",
      description: "Admins can add, update, and manage course details seamlessly.",
      href: "/admin/login",
      cta: "Create Courses",
      background: (
        <img
          src="/assets/manage-background.svg"
          alt="Manage Background"
          className="absolute -right-20 -top-20 opacity-60"
        />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BarChartIcon,
      name: "Income Tracking",
      description:
        "Admins can monitor overall income and sales performance with detailed analytics.",
      href: "/admin/login",
      cta: "View Analytics",
      background: (
        <img
          src="/assets/analytics-background.svg"
          alt="Analytics Background"
          className="absolute -right-20 -top-20 opacity-60"
        />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];
  
  
  export function BentoDemo() {
    return (
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    );
  }
  