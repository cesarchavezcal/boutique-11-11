import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/prisma';

export const createOrder = async (
  res: NextApiResponse,
  req: NextApiRequest
) => {
  try {
    const {
      address,
      clientId,
      comments,
      images,
      phone,
      store,
      status,
      cost,
      coupon,
    } = req.body;
    const order = await prisma.order
      .create({
        data: {
          address,
          clientId,
          comments,
          images,
          phone,
          store,
          status,
          cost,
          coupon,
        },
      })
      .catch((err) => console.log(err));
    res.status(200).json({
      order,
      status: 'Created',
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
