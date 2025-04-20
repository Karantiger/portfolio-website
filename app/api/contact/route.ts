import { NextResponse } from "next/server"
import { z } from "zod"

// Define the schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the data
    const { name, email, subject, message } = contactFormSchema.parse(body)

    // Log the submission (this will appear in Vercel logs)
    console.log("Contact form submission:", { name, email, subject })

    // Here you would normally send an email
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "Message received! We will get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 })
  }
}

