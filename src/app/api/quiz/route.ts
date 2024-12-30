import axios from 'axios';
import { NextResponse } from 'next/server';

const API_URL = `https://api.openai.com/v1/images/generations`;

export async function POST(request: Request): Promise<Response> {
  try {
    const { prompt }: { prompt: string } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    const response = await axios.post(
      API_URL,
      {
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'url',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const imageUrl = response.data?.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image. No URL returned.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error:', error);

    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status || 500;
      const errorMessage =
        error.response.data?.error?.message || 'Unknown error occurred.';

      return NextResponse.json(
        { error: `Image generation failed: ${errorMessage}` },
        { status: statusCode },
      );
    }

    return NextResponse.json(
      { error: 'Unexpected server error occurred.' },
      { status: 500 },
    );
  }
}
