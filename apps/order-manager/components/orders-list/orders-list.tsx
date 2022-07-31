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
    error,
  } = useFetchOrdersByUserQuery();
  return (
    <>
      <PageSubheader
        title="Mis Ordenes"
        description="Aquí tienes la lista de tus pedidos"
      />
      <div className="grid gap-2" role={'list'}>
        {isLoading && <OrderListCardSkeleton />}
        {isError && <ErrorMessage message="¡Ups! ha ocurrido un error" />}
        {!isLoading && orders?.length > 0 ? (
          <>
            {orders?.map((order, i) => (
              <OrderListCard
                key={i}
                order={order}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            ))}
          </>
        ) : (
          <ErrorMessage message="No hay órdenes" />
        )}
      </div>
    </>
  );
}

export default OrdersList;
