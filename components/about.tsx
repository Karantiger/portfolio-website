"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Git",
    "Docker",
    "AWS",
    "CI/CD",
    "GraphQL",
    "Redux",
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <div className="mt-2 h-1 w-20 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 border-2 border-primary rounded-lg transform translate-x-4 translate-y-4"></div>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=400&width=400" alt="Profile" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Who am I?</h3>
            <p className="text-muted-foreground">
              I'm a passionate full-stack developer with a strong focus on creating efficient, scalable, and
              user-friendly applications. With over X years of experience in the industry, I've worked on a variety of
              projects ranging from small business websites to complex enterprise applications.
            </p>
            <p className="text-muted-foreground">
              My approach to development combines technical expertise with creative problem-solving. I believe in
              writing clean, maintainable code and staying up-to-date with the latest technologies and best practices.
            </p>

            <Button variant="outline" className="mt-2" asChild>
              <a href="/resume.pdf" download="YourName_Resume.pdf">
                <FileDown className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>

            <div>
              <h3 className="text-2xl font-bold mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">5+</span>
                  <span className="text-sm text-muted-foreground">Years Experience</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <span className="text-sm text-muted-foreground">Projects Completed</span>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

