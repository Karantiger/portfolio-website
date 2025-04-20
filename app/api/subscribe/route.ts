import { NextResponse } from "next/server"
import { z } from "zod"

// Define the schema for validation
const subscriptionSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the email
    const { email } = subscriptionSchema.parse(body)

    // Log the subscription (this will appear in Vercel logs)
    console.log("Newsletter subscription:", email)

    // Here you would normally send a confirmation email or add to a database
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter!",
    })
  } catch (error) {
    console.error("Subscription error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid email address", errors: error.errors },
        { status: 400 },
      )
    }

    return NextResponse.json({ success: false, message: "Failed to subscribe" }, { status: 500 })
  }
}

