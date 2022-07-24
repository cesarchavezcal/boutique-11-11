import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFetchOrderByIdQuery } from '../../redux/features/orders/orders-api-slice';

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: order,
    isLoading,
    isError,
    isSuccess,
  } = useFetchOrderByIdQuery(id as string);
  console.log(order, isLoading, isError, isSuccess);

  return (
    <div className="container mx-auto">
      {isLoading && 'Cargando...'}
      {isSuccess &&
        order.data[0].images?.map((img, i) => {
          return (
            <figure className="relative max-w-md h-96 aspect-auto" key={i}>
              <Image
                key={i}
                src={img}
                className="max-w-md h-96 rounded-full aspect-square object-cover border border-gray-400"
                width={64}
                height={64}
                layout="fixed"
                alt={img}
              />
            </figure>
          );
        })}
    </div>
  );
};

export default Order;
