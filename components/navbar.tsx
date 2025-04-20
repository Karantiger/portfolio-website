"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, X, FileDown } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Current Project", href: "#current-project" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Coding Profiles", href: "#coding-profiles" },
    { name: "Contact", href: "#contact" },
  ]

  // Toggle between photo and text logo by commenting/uncommenting
  const useLogo = "photo" // Change to "text" if you prefer text logo

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-blue-dark-800/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Photo or Text */}
          <Link href="#" className="flex items-center">
            {useLogo === "photo" ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
                <Image src="/placeholder.svg?height=40&width=40" alt="Your Name" fill className="object-cover" />
              </div>
            ) : (
              <span className="text-xl font-bold text-gradient-blue">Your Name</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  const targetId = link.href.startsWith("#") ? link.href.substring(1) : link.href
                  const targetElement = document.getElementById(targetId)
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {link.name}
              </Link>
            ))}

            <Button variant="outline" size="sm" className="ml-2" asChild>
              <a href="/resume.pdf" download="YourName_Resume.pdf">
                <FileDown className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white dark:bg-blue-dark-800">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    {useLogo === "photo" ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Your Name"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-gradient-blue">Your Name</span>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-4 mt-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="px-2 py-1 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          const targetId = link.href.startsWith("#") ? link.href.substring(1) : link.href
                          const targetElement = document.getElementById(targetId)
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: "smooth" })
                            setIsMobileMenuOpen(false)
                          }
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}

                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <a href="/resume.pdf" download="YourName_Resume.pdf">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Resume
                      </a>
                    </Button>
                  </nav>

                  <div className="mt-auto pt-6 border-t">
                    <div className="flex items-center space-x-4">
                      <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        GitHub
                      </Link>
                      <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        LinkedIn
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

