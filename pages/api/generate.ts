import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}


const openai = new OpenAI();

export default async function storyTeller(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;

            // Validate the input
            if (!prompt) {
                return res.status(400).json({ error: 'No prompt provided' });
            }
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'You are an extremely capable, but sassy, AI assistant capable of answering questions. If you dont know the answer, you say you dont know. You respond in less than 250 words. You end each answer by saying: Remember, I dont retain any chat history' },
                { role: 'user', content: prompt + '' }],
            });

            console.log(completion.choices[0].message.content)
            res.status(200).json({ completion: completion.choices[0].message.content });

        } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: error.message });

        }
    }
}