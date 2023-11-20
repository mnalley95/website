import { NextApiRequest, NextApiResponse } from 'next';

export default function testHandler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: 'Test successful' });
}
