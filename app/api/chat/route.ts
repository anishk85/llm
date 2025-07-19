import { type NextRequest, NextResponse } from "next/server"
import Anthropic from '@anthropic-ai/sdk'

// 🔧 Configuration Constants
const CONFIG = {
  MAX_TOKENS: 100000,           // Consistent with frontend
  DEFAULT_TEMPERATURE: 0.7,
  TIMEOUT_MS: 30000,
} as const

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      messages, 
      temperature = CONFIG.DEFAULT_TEMPERATURE, 
      maxTokens = CONFIG.MAX_TOKENS 
    } = body

    // 🛡️ Validation
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Claude API key not configured" }, 
        { status: 500 }
      )
    }

    // 🔄 Transform messages for Claude API format
    const claudeMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    }))

    console.log(`🚀 Processing request with ${claudeMessages.length} messages, max tokens: ${maxTokens}`)

    // 📡 Call Claude API with streaming
    const stream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: Math.min(maxTokens, CONFIG.MAX_TOKENS), // ✅ Consistent cap
      temperature: temperature,
      messages: claudeMessages,
      stream: true,
    })

    let fullResponse = ''
    let inputTokens = 0
    let outputTokens = 0

    // 🔄 Process streaming response
    for await (const chunk of stream) {
      if (chunk.type === 'message_start') {
        inputTokens = chunk.message.usage?.input_tokens || 0
      } else if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        fullResponse += chunk.delta.text
      } else if (chunk.type === 'message_delta') {
        outputTokens = chunk.usage?.output_tokens || 0
      }
    }

    console.log(`✅ Response generated: ${fullResponse.length} chars, ${inputTokens + outputTokens} tokens used`)

    return NextResponse.json({
      content: fullResponse || "I apologize, but I couldn't generate a response.",
      usage: {
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: inputTokens + outputTokens,
      },
      model: 'claude-sonnet-4-20250514'
    })

  } catch (error: any) {
    console.error("❌ Claude API Error:", error)

    // 🎯 Handle specific Anthropic API errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key" }, 
        { status: 401 }
      )
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." }, 
        { status: 429 }
      )
    }

    if (error?.status === 400) {
      return NextResponse.json(
        { error: "Invalid request to Claude API" }, 
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to get response from Claude" }, 
      { status: 500 }
    )
  }
}

// 📊 Health check endpoint
export async function GET() {
  return NextResponse.json({
    message: "Claude 4 Sonnet Chat API",
    status: "Ready",
    model: "claude-sonnet-4-20250514",
    config: {
      maxTokens: CONFIG.MAX_TOKENS,
      defaultTemperature: CONFIG.DEFAULT_TEMPERATURE,
    },
    endpoints: {
      "POST /api/chat": "Send chat messages",
    },
    environment: process.env.ANTHROPIC_API_KEY ? "✅ API Key Configured" : "❌ API Key Missing"
  })
}