import { UserT } from '@boutique-11-11/models';
import Image from 'next/image';
import {
  IoMailOutline,
  IoLocationOutline,
  IoPhonePortraitOutline,
  IoExitOutline,
  IoAlertCircleSharp,
} from 'react-icons/io5';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

/* eslint-disable-next-line */
export interface ProfileCardProps {
  data: UserT;
}

const ErrorMessage = () => {
  return (
    <p className="text-xs font-normal text-left text-white bg-red-700 flex justify-center items-center rounded-full p-1">
      <IoAlertCircleSharp className="text-base mr-2" />
      Parece que hacen falta algunos datos
    </p>
  );
};

export function ProfileCard(props: ProfileCardProps) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = '/api/user?id=' + props.data.id;

  const { data } = useSWR<{ data?: UserT }>(url, fetcher);

  const hasPhone = data?.data.phone ? true : false;
  const hasAddress = data?.data.address ? true : false;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function submitHandler(values) {
    const profile = {
      address: values.address,
      phone: values.phone,
    };

    await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify(profile),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-white shadow rounded-lg p-10 grid gap-4">
      {data && (
        <>
          <div className="flex flex-col gap-1 text-center items-center">
            <Image
              src={data.data.image}
              className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
              width={128}
              height={128}
              layout="fixed"
              alt={data.data.name}
            />
            <button
              onClick={() => signOut()}
              className=" inline-flex gap-2 items-center relative px-4 border rounded-full mb-4 mt-2"
            >
              <IoExitOutline className="text-base block flex-grow-0 flex-shrink-0 h-8" />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
            <p className="text-lg text-rose-700 font-normal">
              {data.data.name}
            </p>
            <p className="text-sm font-semibold text-center text-gray-600 flex justify-center items-center">
              <IoMailOutline className="text-base mr-1" />
              {data.data.email}
            </p>
            <p className="text-sm font-semibold text-center text-gray-600 flex justify-center items-center">
              <IoLocationOutline className="text-base mr-1" />
              {data.data.address ?? 'No hay domicilio'}
            </p>
            <p className="text-sm font-semibold text-center text-gray-600 flex justify-center items-center">
              <IoPhonePortraitOutline className="text-base mr-1" />
              {data.data.phone ?? 'No hay un número registrado'}
            </p>
          </div>
          <hr />
          {/* When user has some pending data */}
          <form onSubmit={handleSubmit(submitHandler)} className="grid gap-2">
            {!hasPhone && <ErrorMessage />}
            {!hasAddress && <ErrorMessage />}
            {!hasAddress && (
              <input
                type="text"
                placeholder="Domicilio"
                className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                {...register('address')}
              />
            )}
            {!hasPhone && (
              <input
                type="text"
                placeholder="Número de teléfono"
                className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                {...register('phone')}
              />
            )}
            <button
              className="flex justify-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg"
              type="submit"
            >
              Actualizar Datos
            </button>
          </form>
        </>
      )}
    </div>
  );
}
