"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // For testing purposes, let's just log and show a success message
      console.log("Newsletter subscription:", email)

      // Simulate a server delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to my newsletter.",
      })

      // Clear the email input
      setEmail("")

      // Uncomment this when your backend is working
      /*
      const formData = new FormData()
      formData.append("email", email)
      
      const result = await subscribeToNewsletter(formData)
      
      if (result.success) {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to my newsletter.",
        })
        setEmail("")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        })
      }
      */
    } catch (error) {
      console.error("Error subscribing:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="border-t py-12 bg-blue-dark-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Your Name</h3>
            <p className="text-sm text-blue-100">
              A passionate full-stack developer specializing in building exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-blue-100 hover:text-white transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-blue-100 hover:text-white transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-blue-100 hover:text-white transition-colors" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="mailto:your.email@example.com">
                <Mail className="h-5 w-5 text-blue-100 hover:text-white transition-colors" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#home" className="text-sm text-blue-100 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-sm text-blue-100 hover:text-white transition-colors">
                About
              </Link>
              <Link href="#current-project" className="text-sm text-blue-100 hover:text-white transition-colors">
                Current Project
              </Link>
              <Link href="#projects" className="text-sm text-blue-100 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="#certificates" className="text-sm text-blue-100 hover:text-white transition-colors">
                Certificates
              </Link>
              <Link href="#contact" className="text-sm text-blue-100 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-sm text-blue-100">
              Subscribe to my newsletter to receive updates on my latest projects and tech articles.
            </p>
            <form className="flex space-x-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-9 w-full rounded-md border border-blue-dark-700 bg-blue-dark-800 px-3 py-1 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-blue-200/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-dark-700 text-center text-sm text-blue-100">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

