import prisma from './../../../../prisma/prisma';
import { Order } from '@prisma/client';

export async function deleteOrderById(id: string): Promise<Order> {
  const deletedOrder = await prisma.order.delete({
    where: {
      id: String(id),
    },
  });

  prisma.$disconnect();

  return deletedOrder;
}
