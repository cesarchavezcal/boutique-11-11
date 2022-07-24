import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './../../../../prisma/prisma';

export const patchUserById = async (
  res: NextApiResponse,
  req: NextApiRequest,
  id: string
) => {
  try {
    const { phone, address } = req.body;
    const patchedUser = await prisma.user
      .update({
        where: { id: String(id) },
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
