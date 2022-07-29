import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { createOrder } from './controllers/post.controller';
import { getOrdersByUser } from './controllers/get.controller';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session?.user) {
    switch (req.method) {
      case 'GET':
        return getOrdersByUser(res, req, session);
      case 'POST':
        return createOrder(res, req);
    }
  }
}
