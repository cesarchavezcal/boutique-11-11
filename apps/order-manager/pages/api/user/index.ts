import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Session } from 'next-auth/core/types';
import prisma from '../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const id = req.query.id as string;

  switch (req.method) {
    case 'GET':
      return getUserById(res, req, session);
    case 'PATCH':
      return patchUserById(res, req, session);
  }
}

const getUserById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  session: Session
) => {
  try {
    const data = await prisma.user
      .findUnique({
        where: {
          id: session.user.id as string,
        },
        include: {
          orders: true,
        },
      })
      .catch((err) => console.log(err));
    if (data) {
      res.status(200).json({ data });
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const patchUserById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  session: Session
) => {
  try {
    const { phone, address } = req.body;
    console.log(req.body);
    const patchedUser = await prisma.user
      .update({
        where: { id: String(session.user.id) },
        data: {
          phone: phone || undefined,
          address: address || undefined,
        },
      })
      .catch((err) => console.log(err));
    res.status(200).json({
      patchedUser,
      status: 'Updated',
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUserById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  session: Session
) => {
  try {
    const phone = '334343';
    const address = '334343';
    const isUser = await prisma.user.findUnique({
      where: { id: String(session.user.id) },
    });
    console.log('isUser', isUser);
    await prisma.user
      .delete({
        where: { id: String(session.user.id) },
      })
      .catch((err) => console.log(err));
    // Should signup on client side
    res.status(200).json({
      status: 'Deleted',
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
