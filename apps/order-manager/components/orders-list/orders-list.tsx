import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ErrorMessage from '../error-message/error-message';
import PageSubheader from '../page-subheader/page-subheader';
import OrderListCard from '../order-list-card/order-list-card';
import OrderListCardSkeleton from '../order-list-card/skeleton';
import { useFetchOrdersByUserQuery } from './../../redux/features/orders/orders-api-slice';

/* eslint-disable-next-line */
export interface OrdersListProps {}

export function OrdersList(props: OrdersListProps) {
  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
  } = useFetchOrdersByUserQuery();

  return (
    <>
      <PageSubheader
        title="Mis Ordenes"
        description="Aquí tienes la lista de tus pedidos"
      />
      <div className="grid" role={'list'}>
        {isLoading && <OrderListCardSkeleton />}
        {isError && <ErrorMessage message="¡Ups! ha ocurrido un error" />}
        {orders?.data?.map((order, i) => {
          if (order) {
            return (
              <OrderListCard
                key={i}
                order={order}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            );
          } else {
            return <ErrorMessage message="No hay órdenes" />;
          }
        })}
      </div>
    </>
  );
}

export default OrdersList;

// <li key={i} className="py-3 sm:py-4">
//                   <Link as={`/ordenes/${order.id}`} href={`/ordenes/[id]`}>
//                     <a className="flex items-center space-x-4 hover:bg-gray-100 rounded-sm">
//                       <div className="flex-shrink-0">
//                         {order.images.map((img, i) => {
//                           return (
//                             <Image
//                               key={i}
//                               src={img}
//                               className="w-8 h-8 rounded-full aspect-square object-cover border border-gray-400"
//                               width={64}
//                               height={64}
//                               layout="fixed"
//                               alt={img}
//                             />
//                           );
//                         })}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-900 truncate mb-1">
//                           🏪 {order.store}
//                         </p>
//                         <p className="text-sm text-gray-500 truncate mb-1">
//                           📃 {order.comments}
//                         </p>
//                         <p className="text-xs text-gray-800 truncate mb-1 bg-yellow-400 w-max px-2 rounded-md">
//                           {order.status}
//                         </p>
//                       </div>
//                       <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
//                         ${order.cost}
//                       </div>
//                     </a>
//                   </Link>
//                 </li>
