import prisma from './../../../../prisma/prisma';
import { Order } from '@prisma/client';

export async function getOrdersService(id: string): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    where: {
      clientId: id,
    },
  });

  prisma.$disconnect();

  return orders;
}
