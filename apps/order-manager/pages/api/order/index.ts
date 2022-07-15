import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Session } from 'next-auth/core/types';
import prisma from '../../../prisma/prisma';
import { UserT } from '@boutique-11-11/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'GET':
      return getAllOrders(res, req, session);
  }
}

const createOrder = async (
  res: NextApiResponse,
  req: NextApiRequest,
  session: Session
) => {
  const user: UserT = await prisma.user.findUnique({
    where: {
      id: session.user.id as string,
    },
  });

  try {
    const order = {
      address: user.address,
      comments: 'string',
      phone: user.phone,
      store: 'string',
      images: [],
      status: 'Published',
    };

    const order_ = await prisma.order
      .create({
        data: {
          ...order,
          client: { connect: { id: session?.user.id as string } },
        },
      })
      .catch((err) => console.log(err));
    res.status(200).json({ order_ });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllOrders = async (
  res: NextApiResponse,
  req: NextApiRequest,
  session: Session
) => {
  try {
    const data = await prisma.order.findMany({
      include: {
        client: {
          select: {
            name: true,
            image: true,
            phone: true,
          },
        },
      },
    });
    const count = await prisma.order.count();
    if (data) {
      res.status(200).json({ data, count });
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
