import Image from 'next/image';
import {
  IoMailOutline,
  IoLocationOutline,
  IoPhonePortraitOutline,
  IoExitOutline,
  IoAlertCircleOutline,
  IoSaveOutline,
} from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useSession, signOut } from 'next-auth/react';
import {
  useFetchUserByIdQuery,
  useUpdateUserMutation,
} from './../../redux/features/user/user-api-slice';
import ErrorMessage from '../error-message/error-message';

/* eslint-disable-next-line */
export interface ProfileCardProps {}

export function ProfileCard(props: ProfileCardProps) {
  // User session
  const id: string = useSession().data?.user?.id as string;
  const { data, isLoading, isError, isSuccess } = useFetchUserByIdQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function submitHandler(values) {
    const profile = {
      id: id,
      address: values.address,
      phone: values.phone,
    };

    updateUser(profile);
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 grid gap-4">
      {isError && (
        <p className="text-sm font-semibold text-center text-gray-600 flex justify-center items-center">
          <IoAlertCircleOutline className="text-base mr-1 text-red-600" />
          ¡Ups! Ha ocurrido un error
        </p>
      )}
      {/* Loading state */}
      {isLoading && (
        <div
          role="status"
          className="animate-pulse flex justify-center flex-wrap gap-1"
        >
          <div className="h-32 w-32 p-2 rounded-full shadow bg-gray-300"></div>
          <div className="rounded-full bg-gray-300 w-full mb-4 mt-2 h-[34px]"></div>
          <div className="h-7 rounded-full bg-gray-300 w-full"></div>
          <div className="h-5 rounded-full bg-gray-300 w-full"></div>
          <div className="h-5 rounded-full bg-gray-300 w-full"></div>
          <div className="h-5 rounded-full bg-gray-300 w-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {isSuccess && (
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
          <h1>{isUpdating}</h1>
          {!data?.data.phone || !data?.data.address ? (
            <form onSubmit={handleSubmit(submitHandler)} className="grid gap-2">
              <hr />
              <ErrorMessage message="Hacen falta algunos datos" />
              {!data?.data.address && (
                <input
                  type="text"
                  placeholder="Domicilio"
                  className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                  {...register('address')}
                />
              )}
              {!data?.data.phone && (
                <input
                  type="text"
                  placeholder="Número de teléfono"
                  className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                  {...register('phone')}
                />
              )}
              {!data?.data.phone || !data?.data.address ? (
                <button
                  className="mx-auto max-w-max inline-flex gap-2 items-center relative px-4 py-2 border rounded-full shadow-lg bg-rose-500 text-white"
                  type="submit"
                >
                  <span className="text-sm">Actualizar mis datos</span>
                  <IoSaveOutline />
                </button>
              ) : null}
            </form>
          ) : null}
        </>
      )}
    </div>
  );
}
