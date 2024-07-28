import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const groq = createGroq({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });
  const result = await streamText({
    model: groq('llama-3.1-70b-versatile'),
    messages,
  });

  return result.toAIStreamResponse();
}