import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { array1, array2 } = body;

  if (!array1 || !array2) {
    return NextResponse.json(
      { error: 'Sentence is required' },
      { status: 400 },
    );
  }

  try {
    const prompt = `
    Compare the following two keyword arrays and determine their similarity:
    
    Array 1: [${array1.join(', ')}]
    Array 2: [${array2.join(', ')}]
    
    1. Provide the similarity as a percentage (rounded to the nearest whole number).
    2. Explain the result statistically, including the number of matching keywords, total keywords, and any relevant observations.
    3. Translate the explanation into Korean at the end.
    
    Return the similarity percentage and the explanation in a structured JSON format as follows:
    {
      "similarity": "percentage_value",
      "explanation": "detailed_reason_in_korean"
    }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant that calculates and explains keyword similarity.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    });

    const content = response.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error(
        'Failed to retrieve a response from OpenAI. Content is empty.',
      );
    }

    // Try parsing the content into JSON
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      throw new Error('Failed to parse OpenAI response content as JSON.');
    }

    const { similarity, explanation } = parsedContent;
    if (
      typeof similarity === 'undefined' ||
      typeof explanation === 'undefined'
    ) {
      throw new Error(
        'Response is missing required fields: "similarity" or "explanation".',
      );
    }

    return NextResponse.json({ similarity, explanation });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle known errors
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Handle unexpected errors
    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 },
    );
  }
}
