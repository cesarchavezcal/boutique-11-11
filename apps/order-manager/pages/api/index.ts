import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({
        message: 'API for Boutique 11:11',
        version: '1.0.0',
      });
  }
}
