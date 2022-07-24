import { Session } from 'next-auth/core/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';

export const getOrdersByUser = async (
  res: NextApiResponse,
  req: NextApiRequest,
  session: Session
) => {
  try {
    const data = await prisma.order.findMany({
      where: {
        clientId: session.user?.id,
      },
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

    if (data) {
      res.status(200).json({ data });
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOrderById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  orderId: string
) => {
  try {
    const data = await prisma.order.findMany({
      where: {
        id: orderId,
      },
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

    if (data) {
      res.status(200).json({ data });
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
