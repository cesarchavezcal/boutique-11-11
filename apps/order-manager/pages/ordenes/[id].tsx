import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoBagOutline } from 'react-icons/io5';
import { useFetchOrderByIdQuery } from '../../redux/features/orders/orders-api-slice';
import { Spinner, PageHeader } from './../../components';

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: order,
    isLoading,
    isError,
    isSuccess,
  } = useFetchOrderByIdQuery(id as string);

  return (
    <section className="grid gap-4 relative">
      <PageHeader
        title="Detalle de tu orden"
        description="Aquí podrás ver los detalles y estatus de tu orden"
        icon={<IoBagOutline className="text-2xl" />}
      />
      {isSuccess && (
        <>
          <section className="col-span-2 grid grid-cols-2 gap-2">
            {order?.data[0].images?.map((img, i) => {
              return (
                <figure
                  className="aspect-square w-full bg-apricot relative"
                  key={i}
                >
                  <Image
                    key={i}
                    src={img}
                    className="aspect-square object-cover"
                    layout="fill"
                    alt={img}
                    priority
                  />
                </figure>
              );
            })}
          </section>
          <section className="col-span-2 grid gap-2 bg-white rounded-3xl p-8">
            <small>Tienda</small>
            <p className="text-xl text-black inline-flex items-center">
              {order?.data[0].store}
            </p>
            <small>Comentarios</small>
            <p className="text-base text-black-light inline-flex items-center">
              {order?.data[0].comments}
            </p>
            <small>Costo</small>
            <p className="text-base text-black-light inline-flex items-center font-mono">
              Total: ${order?.data[0].cost}
              <br />
              Pagado: ${order?.data[0].payment ? order?.data[0].payment : '00'}
            </p>
            <small>Cupón</small>
            <p className="text-base text-black-light inline-flex items-center">
              Cupón:{' '}
              {order?.data[0].coupon
                ? order?.data[0].coupon
                : 'No usaste cupón'}
            </p>
            <small>Status</small>
            <span className="py-[0.1rem] px-1 text-sm bg-warning rounded w-fit">
              {order?.data[0].status}
            </span>
          </section>
        </>
      )}
    </section>
  );
};

export default Order;
