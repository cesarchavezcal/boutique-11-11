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
            className="bg-white p-4 rounded-3xl shadow-2xl shadow-black-light/5 flex gap-4"
          >
            <figure className="bg-apricot w-24 h-full flex-shrink-0 rounded-3xl relative">
              <Image
                src={props.order?.images[0]}
                className="w-full h-full rounded-3xl aspect-square border border-gray-400"
                layout="fill"
                alt="Imagen de pedido"
                objectFit={'cover'}
              />
            </figure>
            <div className="flex-1">
              <p className="text-xl text-black">{props.order?.store}</p>
              <p className="text-base text-black-light">
                {props.order?.comments}
              </p>
              <p className="text-base text-black font-bold">
                <small className="text-sm text-black-light font-normal">
                  Abonado:{' '}
                </small>
                ${props.order?.payment ?? '00.00'}
              </p>
              <p className="text-base text-black font-bold">
                <small className="text-sm text-black-light font-normal">
                  Total:{' '}
                </small>
                ${props.order?.cost ?? '00.00'}
              </p>
              <span className="py-[0.1rem] px-1 text-sm bg-warning rounded">
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
