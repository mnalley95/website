import OpenAI from "openai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // Check for API key at runtime
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const openai = new OpenAI();

        const body = await request.json();
        const { prompt } = body;

        // Validate the input
        if (!prompt) {
            return NextResponse.json(
                { error: 'No prompt provided' },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an extremely capable, but sassy, AI assistant capable of answering questions. If you dont know the answer, you say you dont know. You respond in less than 250 words. You end each answer by saying: Remember, I dont retain any chat history'
                },
                { role: 'user', content: prompt + '' }
            ],
        });

        console.log(completion.choices[0].message.content);

        return NextResponse.json(
            { completion: completion.choices[0].message.content },
            { status: 200 }
        );

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
