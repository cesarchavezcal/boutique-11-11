import prisma from './../../../../../prisma/prisma';
import { Order } from '@prisma/client';

export async function getOrderById(id: string): Promise<Order> {
  const order = await prisma.order.findFirst({
    where: {
      id: id,
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

  prisma.$disconnect();

  return order;
}
