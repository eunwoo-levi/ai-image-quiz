import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { sentence } = body;

  if (!sentence) {
    return NextResponse.json(
      { error: 'Sentence is required' },
      { status: 400 },
    );
  }

  try {
    const prompt = `
Extract the main items from the following Korean sentence:
"${sentence}"
Return main items as a comma-separated list in Korean.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that extracts main items.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 50,
    });

    const keywords =
      response.choices?.[0]?.message?.content?.trim()?.split(',') || [];
    if (!keywords.length) {
      throw new Error('Failed to extract keywords. Response content is empty.');
    }

    return NextResponse.json({ keywords: keywords.map((k) => k.trim()) });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // OpenAI API의 일반적인 에러 처리
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // 예상치 못한 에러 처리
    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 },
    );
  }
}
