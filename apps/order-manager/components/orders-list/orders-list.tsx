import Image from 'next/image';
import { useFetchOrdersQuery } from '@order-manager/redux/features/orders/orders-api-slice';
import ErrorMessage from '../error-message/error-message';

/* eslint-disable-next-line */
export interface OrdersListProps {}

export function OrdersList(props: OrdersListProps) {
  const { data: orders, isLoading, isError, isSuccess } = useFetchOrdersQuery();
  return (
    <>
      <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 ">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-rose-700 font-normal">Mis Órdenes</p>
        </div>
        {isSuccess && !orders?.data.length && (
          <ErrorMessage message="Aún no hay órdenes" />
        )}

        {isLoading && (
          <div
            role="status"
            className="animate-pulse flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full shadow bg-gray-300" />
            </div>
            <div className="flex-1">
              <div className="h-5 rounded-full bg-gray-300 w-full mb-1" />
              <div className="h-5 rounded-full bg-gray-300 w-full" />
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
              <div className="h-6 w-11 rounded-full bg-gray-300" />
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {isSuccess && orders?.data.length ? (
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 ">
              {orders.data.map((order, i) => (
                <li key={i} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {order.images.map((img, i) => {
                        return (
                          <Image
                            key={i}
                            src={img}
                            className="w-8 h-8 rounded-full aspect-square object-cover border border-gray-400"
                            width={64}
                            height={64}
                            layout="fixed"
                            alt={img}
                          />
                        );
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate mb-1">
                        {order.store}
                      </p>
                      <p className="text-sm text-gray-500 truncate mb-1">
                        {order.comments}
                      </p>
                      <p className="text-xs text-gray-800 truncate mb-1 bg-yellow-400 w-max px-2 rounded-md">
                        {order.status}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      $23.09
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default OrdersList;
