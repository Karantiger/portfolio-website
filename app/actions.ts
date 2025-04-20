"use server"

import { z } from "zod"
import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Contact form schema
const contactFormSchema = z.object({
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

// Newsletter subscription schema
const subscriptionSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

// Function to send contact form emails
export async function sendContactEmail(formData: FormData) {
  try {
    // Parse and validate form data
    const validatedFields = contactFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    })

    // Log the submission to console
    console.log("Contact form submission received:", {
      name: validatedFields.name,
      email: validatedFields.email,
      subject: validatedFields.subject,
    })

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Use your verified domain or Resend's default
      to: process.env.NOTIFICATION_EMAIL || "your-email@example.com",
      subject: `Portfolio Contact: ${validatedFields.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedFields.name}</p>
        <p><strong>Email:</strong> ${validatedFields.email}</p>
        <p><strong>Subject:</strong> ${validatedFields.subject}</p>
        <h3>Message:</h3>
        <p>${validatedFields.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Error sending email with Resend:", error)
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      }
    }

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error sending contact email:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}

// Function to handle newsletter subscriptions
export async function subscribeToNewsletter(formData: FormData) {
  try {
    // Parse and validate email
    const validatedFields = subscriptionSchema.parse({
      email: formData.get("email"),
    })

    // Log the subscription to console
    console.log("New newsletter subscription:", validatedFields.email)

    // Send email notification using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Newsletter <onboarding@resend.dev>", // Use your verified domain or Resend's default
      to: process.env.NOTIFICATION_EMAIL || "your-email@example.com",
      subject: "New Newsletter Subscription",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>Someone has subscribed to your newsletter with the email: <strong>${validatedFields.email}</strong></p>
      `,
    })

    if (error) {
      console.error("Error sending email with Resend:", error)
      return {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      }
    }

    return { success: true, message: "Subscribed successfully!" }
  } catch (error) {
    console.error("Error processing subscription:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please enter a valid email address.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    }
  }
}

