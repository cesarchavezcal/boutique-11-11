import { OrderT } from '@boutique-11-11/models';
import Image from 'next/image';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface OrderListCardProps {
  order?: OrderT;
  isLoading: boolean;
  isSuccess: boolean;
}

export function OrderListCard(props: OrderListCardProps) {
  return (
    <>
      {props.isSuccess && (
        <Link href={`/ordenes/${props.order?.id}`}>
          <a
            role={'listitem'}
            className="shadow-black-light/5 flex gap-4 rounded-3xl bg-white p-4 shadow-2xl"
          >
            <figure className="bg-apricot relative h-full w-24 flex-shrink-0 rounded-3xl">
              <Image
                src={props.order?.images[0]}
                className="aspect-square h-full w-full rounded-3xl border border-gray-400"
                layout="fill"
                alt="Imagen de pedido"
                objectFit={'cover'}
              />
            </figure>
            <div className="flex-1">
              <p className="text-xl text-black">{props.order?.store}</p>
              <p className="text-black-light text-base">
                {props.order?.comments}
              </p>
              <p className="text-base font-bold text-black">
                <small className="text-black-light text-sm font-normal">
                  Abonado:{' '}
                </small>
                ${props.order?.payment ?? '00.00'}
              </p>
              <p className="text-base font-bold text-black">
                <small className="text-black-light text-sm font-normal">
                  Total:{' '}
                </small>
                ${props.order?.cost ?? '00.00'}
              </p>
              <span className="bg-warning rounded py-[0.1rem] px-1 text-sm">
                {props.order?.status}
              </span>
            </div>
          </a>
        </Link>
      )}
    </>
  );
}

export default OrderListCard;
