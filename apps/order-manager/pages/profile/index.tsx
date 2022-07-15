import { UserT } from '@boutique-11-11/models';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { MdLocationOn, MdEmail, MdPhone, MdExitToApp } from 'react-icons/md';
import useSWR from 'swr';

/* eslint-disable-next-line */
export interface ProfileProps {}

const fetcher = (url) => fetch(url).then((res) => res.json());
const url = 'https://boutique-11-11.vercel.app/api/user';

export function Profile(props: ProfileProps) {
  const { data, status } = useSession();
  const fetchOrders = useSWR<{ data?: UserT }>(url, fetcher);
  return (
    <section className="container p-4">
      <div className="bg-white shadow rounded-lg p-10">
        <div className="flex flex-col gap-1 text-center items-center">
          {data && (
            <>
              <Image
                src={data.user?.image}
                className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                width={128}
                height={128}
                layout="fixed"
                alt={data.user?.name}
              />
              <button
                onClick={() => signIn()}
                className="inline-flex gap-2 items-center relative px-2 border rounded-full hover:shadow-lg transition-shadow my-4"
              >
                <MdExitToApp className="text-xl block flex-grow-0 flex-shrink-0 h-8" />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
              <p className="font-semibold">{data.user?.name}</p>
              <p className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                <MdEmail className="text-base mr-1" />
                {data.user?.email}
              </p>
              <p className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                <MdLocationOn className="text-base mr-1" />
                {data.user?.address}
              </p>
              <p className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                <MdPhone className="text-base mr-1" />
                {data.user?.phone}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 justify-center items-center my-3">
        {fetchOrders.data?.data?.orders?.map((order, i) => {
          console.log(order);
          return (
            <div
              key={i}
              className="flex bg-white shadow rounded-lg p-2 col-span-full"
            >
              {order.images.map((img, i) => {
                return (
                  <Image
                    key={i}
                    src={img}
                    className="w-16  object-cover  h-16 rounded-xl"
                    width={64}
                    height={64}
                    layout="fixed"
                    alt={img}
                  />
                );
              })}

              <div className="flex flex-col justify-center w-full px-2 py-1">
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col">
                    <p className="text-sm">
                      Tienda:
                      <span className=" font-medium"> {order.store}</span>
                    </p>
                    <p className="text-xs">
                      Comentarios:
                      <span className=" font-medium">{order.comments}</span>
                    </p>
                    <p className="text-xs">
                      Status:
                      <span className=" font-medium"> {order.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Profile;
