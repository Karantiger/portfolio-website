"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileDown } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-blue-dark dark:bg-gradient-blue-dark"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-dark-900/50 to-blue-dark-800 z-10"
        style={{ opacity: Math.min(scrollY / 500, 0.6) }}
      />

      <div className="container px-4 md:px-6 z-20">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
              <span className="text-primary">Hello, I'm </span>
              <span className="text-gradient-blue">Your Name</span>
            </h1>
          </motion.div>

          <motion.p
            className="max-w-[700px] text-blue-100 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A passionate full-stack developer specializing in building exceptional digital experiences.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/resume.pdf" download="YourName_Resume.pdf">
                <FileDown className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:your.email@example.com">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-white/10"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </div>
    </section>
  )
}

