import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './../../../../prisma/prisma';

export const deleteUserById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  id: string
) => {
  try {
    await prisma.user
      .delete({
        where: { id: String(id) },
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
