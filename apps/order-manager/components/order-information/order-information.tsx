import { useRouter } from 'next/router';
import { Order } from '@prisma/client';
import { IoTrashOutline } from 'react-icons/io5';
import { useDeleteOrderByIDMutation } from '../../redux/features/orders/orders-api-slice';
import Spinner from '../spinner/spinner';
/* eslint-disable-next-line */
export interface OrderInformationProps {
  data: Order;
  isLoading: boolean;
}

export function OrderInformation(props: OrderInformationProps) {
  const style = {
    '--hero-bg': 'url(/images/handmadepaper.png)',
  } as React.CSSProperties;
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderByIDMutation();
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      {props.isLoading ? (
        <div
          role="status"
          className="grid animate-pulse gap-2 rounded bg-white p-4"
        >
          <div className="grid gap-1">
            <div className="bg-black-light/30 h-5 w-2/6 rounded-full" />
            <div className="bg-black-light/30 h-6 w-2/4 rounded-full" />
          </div>
          <div className="grid gap-1">
            <div className="bg-black-light/30 h-5 w-2/4 rounded-full" />
            <div className="bg-black-light/30 h-7 w-full rounded-full" />
          </div>
          <div className="grid gap-1">
            <div className="bg-black-light/30 h-5 w-2/4 rounded-full" />
            <div className="bg-black-light/30 h-7 w-full rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <section className="col-span-1">
              <div className="bg-black-light/30 mb-1 h-5 w-2/4 rounded-full" />
              <div className="bg-black-light/30 h-7 w-full rounded-full" />
            </section>
            <section className="col-span-1">
              <div className="bg-black-light/30 mb-1 h-5 w-2/4 rounded-full" />
              <div className="bg-black-light/30 h-7 w-full rounded-full" />
            </section>
          </div>
          <div className="grid gap-1">
            <div className="bg-black-light/30 h-5 w-2/4 rounded-full" />
            <div className="bg-black-light/30 h-7 w-full rounded-full" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {isDeleting && <Spinner />}
          <section
            style={style}
            className="bg-background relative grid gap-2 rounded-3xl bg-[image:var(--hero-bg)] bg-fixed p-4 shadow"
          >
            <section className="grid gap-1">
              <small className="text-black-light">Status</small>
              <span className="bg-warning w-fit rounded py-[0.1rem] px-1 text-sm">
                {props.data?.status}
              </span>
            </section>
            <hr className="opacity-10" />
            <section className="grid gap-1">
              <small className="text-black-light">Tienda</small>
              <p className="text-xl text-black">{props.data?.store}</p>
            </section>
            <hr className="opacity-10" />
            <section className="grid gap-1">
              <small className="text-black-light">Comentarios</small>
              <p className="text-xl text-black">{props.data?.comments}</p>
            </section>
            <hr className="opacity-10" />
            <section className="grid grid-cols-2 gap-1">
              <section className="col-span-1">
                <small className="text-black-light mb-1">Costo</small>
                <p className="text-focus font-mono text-xl">
                  ${props.data?.cost}
                </p>
              </section>
              <section className="col-span-1">
                <small className="text-black-light mb-1">Abonado</small>
                <p className="text-danger text-xl">
                  ${props.data?.payment ?? '00.00'}
                </p>
              </section>
            </section>
            <hr className="opacity-10" />
            <section className="grid gap-1">
              <small className="text-black-light">Cupón</small>
              <p className="font-mono text-xl text-black">
                {props.data?.coupon.length !== 0
                  ? props.data?.coupon
                  : 'No usaste cupón'}
              </p>
            </section>
            <hr className="mb-6 opacity-10" />
            {props.data?.status === 'No pedido' && (
              <section className="grid gap-1">
                <small className="text-danger">
                  Tu pedido aún no ha sido pedido, puedes cancelarlo si lo
                  deseas.
                </small>
                <button
                  onClick={() =>
                    deleteOrder(id as string).then(() => {
                      router.push('/');
                    })
                  }
                  className="bg-danger relative inline-flex w-full items-center justify-center gap-2 rounded-full py-3 px-4 text-center text-white shadow-lg"
                >
                  Cancelar mi pedido
                  <IoTrashOutline />
                </button>
              </section>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default OrderInformation;
