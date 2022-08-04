import type { NextApiRequest } from 'next';
import { Order } from '@prisma/client';
import prisma from '../../../../prisma/prisma';

export async function postOrdersByUser(req: NextApiRequest) {
  const {
    address,
    clientId,
    comments,
    cost,
    coupon,
    images,
    payment,
    phone,
    status,
    store,
  }: Order = req.body;
  const order: Order = await prisma.order.create({
    data: {
      address,
      clientId,
      comments,
      cost,
      coupon,
      images,
      payment,
      phone,
      status,
      store,
    },
  });

  prisma.$disconnect();

  return order;
}
