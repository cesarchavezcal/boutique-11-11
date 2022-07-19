import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@order-manager/prisma/prisma';

export const getUserById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  id: string
) => {
  try {
    const data = await prisma.user
      .findUnique({
        where: {
          id: id as string,
        },
        include: {
          orders: true,
        },
      })
      .catch((err) => console.log(err));

    if (data) {
      res.status(200).json({ data });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
