import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: "healthy",
    engine: "online",
    database: "demo-mode",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
}
