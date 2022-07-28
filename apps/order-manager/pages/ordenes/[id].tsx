import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoBagOutline } from 'react-icons/io5';
import { useFetchOrderByIdQuery } from '../../redux/features/orders/orders-api-slice';
import { PageHeader } from './../../components';

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: order, isSuccess } = useFetchOrderByIdQuery(id as string);

  return (
    <section className="relative grid grid-cols-1 gap-4">
      <PageHeader
        title="Detalle de tu orden"
        description="Aquí podrás ver los detalles y estatus de tu orden"
        icon={<IoBagOutline className="text-2xl" />}
      />
      {isSuccess && (
        <>
          <section
            className={`grid snap-x snap-mandatory grid-flow-col grid-cols-none gap-2 overflow-x-auto overscroll-contain ${
              order?.data[0].images.length > 1
                ? 'auto-cols-[94%]'
                : 'auto-cols-[100%]'
            }`}
          >
            {order?.data[0].images?.map((img, i) => {
              return (
                <figure
                  className="bg-apricot relative aspect-square w-full snap-start"
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
          <section className="col-span-1 grid gap-2 rounded-3xl bg-white p-8">
            <small>Tienda</small>
            <p className="inline-flex items-center text-xl text-black">
              {order?.data[0].store}
            </p>
            <small>Comentarios</small>
            <p className="text-black-light inline-flex items-center text-base">
              {order?.data[0].comments}
            </p>
            <small>Costo</small>
            <p className="text-black-light inline-flex items-center font-mono text-base">
              Total: ${order?.data[0].cost ?? '00.00'}
              <br />
              Pagado: ${order?.data[0].payment ?? '00.00'}
            </p>
            <small>Cupón</small>
            <p className="text-black-light inline-flex items-center text-base">
              Cupón:{' '}
              {order?.data[0].coupon
                ? order?.data[0].coupon
                : 'No usaste cupón'}
            </p>
            <small>Status</small>
            <span className="bg-warning w-fit rounded py-[0.1rem] px-1 text-sm">
              {order?.data[0].status}
            </span>
          </section>
        </>
      )}
    </section>
  );
};

export default Order;
