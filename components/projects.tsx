"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

// Sample project data - in a real app, this would come from an API or CMS
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment processing, inventory management, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team workspaces.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 3,
    title: "Fitness Tracker",
    description: "A mobile app for tracking workouts, nutrition, and fitness goals with data visualization.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React Native", "GraphQL", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "mobile",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather forecasting application with interactive maps and real-time data.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["JavaScript", "OpenWeather API", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 5,
    title: "Inventory Management System",
    description: "A comprehensive inventory management system for small businesses.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Express", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 6,
    title: "AI Image Generator",
    description: "An application that generates images using AI based on text prompts.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "TensorFlow", "React"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "ai",
  },
]

const categories = ["all", "web", "mobile", "ai"]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects =
    activeCategory === "all" ? projectsData : projectsData.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
          <div className="mt-2 h-1 w-20 bg-primary rounded-full"></div>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl">
            Here are some of the projects I've worked on. Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

