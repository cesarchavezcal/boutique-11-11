import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getOrderById } from './services/order.get';
import { deleteOrderById } from './services/order.delete';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = req.query;
  if (session?.user) {
    switch (req.method) {
      case 'GET':
        return getOrderById(id as string)
          .then((order) => {
            res.status(200).json(order);
          })
          .catch((error) => res.status(500).json({ error: error }));
      case 'DELETE':
        return deleteOrderById(id as string)
          .then(() => {
            res.status(200).json({ status: 'deleted' });
          })
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
