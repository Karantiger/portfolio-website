"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, ExternalLink } from "lucide-react"

// Sample certificate data - in a real app, this would come from an API or CMS
const certificatesData = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "January 2023",
    image: "/placeholder.svg?height=400&width=600",
    credentialUrl: "https://example.com/credential/1",
  },
  {
    id: 2,
    title: "Professional Full-Stack Engineer",
    issuer: "Meta",
    date: "March 2023",
    image: "/placeholder.svg?height=400&width=600",
    credentialUrl: "https://example.com/credential/2",
  },
  {
    id: 3,
    title: "Machine Learning Specialization",
    issuer: "Stanford University & Coursera",
    date: "June 2023",
    image: "/placeholder.svg?height=400&width=600",
    credentialUrl: "https://example.com/credential/3",
  },
  {
    id: 4,
    title: "React Native Developer",
    issuer: "Udemy",
    date: "August 2023",
    image: "/placeholder.svg?height=400&width=600",
    credentialUrl: "https://example.com/credential/4",
  },
]

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="certificates" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Certificates</h2>
          <div className="mt-2 h-1 w-20 bg-primary rounded-full"></div>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl">
            Professional certifications and courses I've completed to enhance my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Dialog>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{certificate.title}</CardTitle>
                    <CardDescription>{certificate.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {certificate.date}
                    </div>
                    <DialogTrigger asChild>
                      <div className="relative h-32 w-full overflow-hidden rounded-md cursor-pointer">
                        <Image
                          src={certificate.image || "/placeholder.svg"}
                          alt={certificate.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white font-medium">View Certificate</span>
                        </div>
                      </div>
                    </DialogTrigger>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Verify
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <DialogContent className="max-w-3xl">
                  <DialogTitle className="sr-only">{certificate.title} Certificate</DialogTitle>
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={certificate.image || "/placeholder.svg"}
                      alt={certificate.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold">{certificate.title}</h3>
                    <p className="text-muted-foreground">
                      {certificate.issuer} • {certificate.date}
                    </p>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Verify Credential
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

