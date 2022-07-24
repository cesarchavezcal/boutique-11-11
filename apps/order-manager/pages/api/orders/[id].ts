import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getOrderById } from './controllers/get.controller';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = req.query;
  if (session?.user) {
    switch (req.method) {
      case 'GET':
        return getOrderById(res, req, id as string);
      default:
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
    }
  }
}
