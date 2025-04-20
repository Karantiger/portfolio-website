import Hero from "@/components/hero"
import About from "@/components/about"
import CurrentProject from "@/components/current-project"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import CodingProfiles from "@/components/coding-profiles"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      <Hero />
      <About />
      <CurrentProject />
      <Projects />
      <Certificates />
      <CodingProfiles />
      <Contact />
      <Footer />
    </main>
  )
}

