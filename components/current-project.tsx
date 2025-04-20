"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"

// Sample project data - replace with your actual current project
const currentProject = {
  title: "E-Commerce Dashboard",
  description:
    "A comprehensive dashboard for e-commerce businesses with real-time analytics, inventory management, and customer insights. Built with Next.js, TypeScript, and Tailwind CSS.",
  longDescription:
    "This project addresses the challenges faced by modern e-commerce businesses in managing their operations efficiently. The dashboard provides a centralized interface for monitoring sales, tracking inventory, analyzing customer behavior, and managing orders. It features real-time data visualization, predictive analytics for inventory management, and customizable reporting tools.",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Chart.js", "React Query"],
  features: [
    "Real-time sales and traffic analytics",
    "Inventory management with low-stock alerts",
    "Customer segmentation and behavior analysis",
    "Order processing and fulfillment tracking",
    "Customizable dashboard widgets",
  ],
  images: [
    {
      src: "/placeholder.svg?height=600&width=1000",
      alt: "Dashboard overview showing sales analytics",
    },
    {
      src: "/placeholder.svg?height=600&width=1000",
      alt: "Inventory management interface",
    },
    {
      src: "/placeholder.svg?height=600&width=1000",
      alt: "Customer insights and segmentation",
    },
    {
      src: "/placeholder.svg?height=600&width=1000",
      alt: "Order processing workflow",
    },
  ],
  githubUrl: "https://github.com",
  liveUrl: "https://example.com",
}

export default function CurrentProject() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = currentProject.images.length

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="current-project" className="py-20 bg-blue-dark-800 text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Current Project</h2>
          <div className="mt-2 h-1 w-20 bg-primary rounded-full"></div>
          <p className="mt-4 text-center text-blue-100 max-w-2xl">
            Take a look at what I'm currently working on. This project showcases my latest skills and technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg"
          >
            <div className="relative h-full w-full">
              {currentProject.images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-dark-900/80 p-2 rounded-full shadow-md hover:bg-blue-dark-900 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-dark-900/80 p-2 rounded-full shadow-md hover:bg-blue-dark-900 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {currentProject.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-primary w-4" : "bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide ? "true" : "false"}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">{currentProject.title}</h3>
            <p className="text-blue-100">{currentProject.description}</p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 bg-blue-dark-700 text-blue-100">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Key Features</h4>
              <ul className="space-y-2 list-disc list-inside text-blue-100">
                {currentProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild variant="outline" className="border-blue-100 text-blue-100 hover:bg-blue-dark-700">
                <Link href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Link>
              </Button>
              <Button asChild>
                <Link href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Additional Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-blue-dark-700 border-blue-dark-900 text-white">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-4">Project Background</h4>
              <p className="text-blue-100 mb-6">{currentProject.longDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-dark-900/50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Challenge</h5>
                  <p className="text-sm text-blue-100">
                    Creating an intuitive interface that presents complex data in an accessible way while maintaining
                    performance with real-time updates.
                  </p>
                </div>
                <div className="bg-blue-dark-900/50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Solution</h5>
                  <p className="text-sm text-blue-100">
                    Implemented a modular architecture with React Query for data fetching, optimistic UI updates, and
                    efficient state management.
                  </p>
                </div>
                <div className="bg-blue-dark-900/50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Results</h5>
                  <p className="text-sm text-blue-100">
                    A highly responsive dashboard that handles large datasets with minimal loading times and provides
                    actionable insights for business owners.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

