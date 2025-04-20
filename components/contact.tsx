"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, MapPin, Phone, Send } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // For testing purposes, let's just log and show a success message
      console.log("Form submitted with values:", values)

      // Simulate a server delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset the form
      form.reset()

      // Uncomment this when your backend is working
      /*
      // Create FormData object
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })
      
      // Send the form data to the server action
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
      */
    } catch (error) {
      console.error("Error submitting form:", error)
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
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
          <div className="mt-2 h-1 w-20 bg-primary rounded-full"></div>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out to me through any of these channels. I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">your.email@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+1 (123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject of your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

