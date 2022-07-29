import Image from 'next/image';
import {
  IoExitOutline,
  IoLocationOutline,
  IoPhonePortraitOutline,
} from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import {
  useFetchUserQuery,
  useUpdateUserMutation,
} from './../../redux/features/user/user-api-slice';
import { ErrorMessage, Spinner } from '../';

/* eslint-disable-next-line */
export interface ProfileCardProps {}

export function ProfileCard(props: ProfileCardProps) {
  // User session
  const { data, isLoading, isError, isSuccess } = useFetchUserQuery('');
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const { handleSubmit, register } = useForm();

  async function submitHandler(values) {
    const profile = {
      address: values.address,
      phone: values.phone,
    };

    updateUser(profile);
  }

  return (
    <div className="shadow-black-light/5 grid gap-4 rounded-3xl bg-white p-4 shadow-2xl">
      {isError && <ErrorMessage message="¡Ups! Ha ocurrido un error" />}
      {isLoading && (
        <div
          role="status"
          className="flex animate-pulse flex-wrap justify-center gap-1"
        >
          <div className="bg-black-light/30 h-32 w-32 rounded-full p-2 shadow"></div>
          <div className="bg-black-light/30 mb-4 mt-2 h-[34px] w-full rounded-full"></div>
          <div className="bg-black-light/30 h-7 w-full rounded-full"></div>
          <div className="bg-black-light/30 h-5 w-full rounded-full"></div>
          <div className="bg-black-light/30 h-5 w-full rounded-full"></div>
          <div className="bg-black-light/30 h-5 w-full rounded-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {isSuccess && (
        <>
          <div className="flex flex-col items-center gap-1 text-center">
            <Image
              src={data.data.image}
              className="mb-4 h-32 w-32 rounded-full bg-white p-2 shadow"
              width={128}
              height={128}
              layout="fixed"
              alt={data.data.name}
            />
            <button
              onClick={() => signOut()}
              className=" bg-danger relative mb-4 mt-2 inline-flex items-center gap-2 rounded-full px-4 text-white"
            >
              <IoExitOutline className="block h-8 flex-shrink-0 flex-grow-0 text-base" />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
            <p className="text-xl font-normal text-black">{data.data.name}</p>
            <p className="text-black-light text-center text-lg">
              {data.data.email}
            </p>
            <p className="text-black-light inline-flex items-center gap-2 text-center text-lg">
              <IoLocationOutline className="block h-8 flex-shrink-0 flex-grow-0 text-xl" />
              {data.data.address
                ? data.data.address
                : 'No hay un domicilio registrado'}
            </p>
            <p className="text-black-light inline-flex items-center gap-2 text-center text-lg">
              <IoPhonePortraitOutline className="block h-8 flex-shrink-0 flex-grow-0 text-xl" />
              {data.data.phone
                ? data.data.phone
                : 'No hay un número registrado'}
            </p>
          </div>
          {!data?.data.phone || !data?.data.address ? (
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="relative mt-2 grid gap-2"
            >
              <ErrorMessage message="Hacen falta algunos datos" />
              {isUpdating && <Spinner />}
              {!data?.data.address && (
                <input
                  type="text"
                  placeholder="Domicilio"
                  className="bg-background rounded-tg placeholder:text-black-light w-full appearance-none rounded-lg py-3 px-4"
                  {...register('address')}
                />
              )}
              {!data?.data.phone && (
                <input
                  type="tel"
                  inputMode="decimal"
                  autoComplete="tel"
                  placeholder="Número de teléfono"
                  className="bg-background rounded-tg placeholder:text-black-light w-full appearance-none rounded-lg py-3 px-4"
                  {...register('phone')}
                />
              )}
              {!data?.data.phone || !data?.data.address ? (
                <button
                  className="bg-apricot relative w-full gap-2 rounded-full py-3 px-4 text-center text-white shadow-lg"
                  type="submit"
                >
                  Actualizar mis datos
                </button>
              ) : null}
            </form>
          ) : null}
        </>
      )}
    </div>
  );
}
