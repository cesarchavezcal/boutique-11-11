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
        {fetchOrders.data?.data?.orders.map((order, i) => {
          return (
            <div
              key={i}
              className="flex bg-white shadow rounded-lg p-2 col-span-full"
            >
              <img
                src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                alt="Just a flower"
                className=" w-16  object-cover  h-16 rounded-xl"
              />
              <div className="flex flex-col justify-center w-full px-2 py-1">
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col">
                    <h2 className="text-sm font-medium">Massive Dynamic</h2>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </div>
                <div className="flex pt-2  text-sm text-gray-400">
                  <div className="flex items-center mr-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <p className="font-normal">4.5</p>
                  </div>
                  <div className="flex items-center font-medium text-gray-900 ">
                    $1800
                    <span className="text-gray-400 text-sm font-normal">
                      {' '}
                      /wk
                    </span>
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
