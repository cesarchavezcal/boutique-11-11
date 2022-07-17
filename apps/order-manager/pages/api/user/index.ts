import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getUserById } from './controllers/get.controller';
import { patchUserById } from './controllers/patch.controller';
import { deleteUserById } from './controllers/delete.controller';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session?.user) {
    switch (req.method) {
      case 'GET':
        return getUserById(res, req, session.user.id as string);
      case 'PATCH':
        return patchUserById(res, req, session.user.id as string);
      case 'DELETE':
        return deleteUserById(res, req, session.user.id as string);
      default:
        throw new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        );
    }
  }
}
