import { UserT } from '@boutique-11-11/models';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { MdLocationOn, MdEmail, MdPhone, MdExitToApp } from 'react-icons/md';
import useSWR from 'swr';
import {
  IoMailOutline,
  IoLocationOutline,
  IoPhonePortraitOutline,
  IoExitOutline,
} from 'react-icons/io5';
import { LoginCard, Spinner, ProfileCard } from '../components';

/* eslint-disable-next-line */
export interface ProfileProps {}

const fetcher = (url) => fetch(url).then((res) => res.json());
const url = 'https://boutique-11-11.vercel.app/api/user';

export function Profile(props: ProfileProps) {
  const { data, status } = useSession();
  const fetchOrders = useSWR<{ data?: UserT }>(url, fetcher);
  return (
    <section className="container p-4 min-h-[calc(100vh-4rem)]">
      {status === 'loading' && <Spinner />}
      {!data && status !== 'loading' && <LoginCard />}
      {data && <ProfileCard data={data.user} />}
      <div className="grid grid-cols-12 gap-2 justify-center items-center my-3">
        {fetchOrders.data?.data?.orders?.map((order, i) => {
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
