import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoBagOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { useFetchOrderByIdQuery } from '../../redux/features/orders/orders-api-slice';
import {
  PageHeader,
  ImagesCarousel,
  OrderInformation,
} from './../../components';

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError, error } = useFetchOrderByIdQuery(
    id as string
  );

  if (!isError) {
    return (
      <section className="relative grid grid-cols-1 gap-4">
        <PageHeader
          title="Detalle de tu orden"
          description="Aquí podrás ver los detalles y estatus de tu orden"
          icon={<IoBagOutline className="text-2xl" />}
        />
        <ImagesCarousel data={data?.images} isLoading={isLoading} />
        <OrderInformation data={data} isLoading={isLoading} />
      </section>
    );
  } else {
    return (
      <section className="shadow-black-light/5 grid place-content-center gap-2 rounded-3xl bg-white p-4 shadow-2xl">
        <span className="bg-danger mx-auto w-max rounded-3xl p-4">
          <IoAlertCircleOutline className="text-3xl text-white" />
        </span>
        <p className="text-danger text-center text-xl">
          ¡Ha ocurrido un error al cargar tu pedido!
        </p>
        <Link href={'/'}>
          <a className="text-center text-black underline">
            Puedes regresar al inicio
          </a>
        </Link>
      </section>
    );
  }
};

export default Order;
