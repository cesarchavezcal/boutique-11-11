import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getOrdersService } from './services/orders.get';
import { postOrdersByUser } from './services/orders.post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session?.user) {
    switch (req.method) {
      case 'GET':
        return getOrdersService(session.user?.id as string)
          .then((orders) => res.status(200).json(orders))
          .catch((error) => res.status(500).json({ error: error }));
      case 'POST':
        return postOrdersByUser(req)
          .then((order) => res.status(200).json(order))
          .catch((error) => res.status(500).json({ error: error }));
      default:
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
    }
  } else {
    return res.status(403).json({ error: 'Please login to see the data' });
  }
}
