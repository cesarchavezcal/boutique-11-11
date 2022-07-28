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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function submitHandler(values) {
    const profile = {
      address: values.address,
      phone: values.phone,
    };

    updateUser(profile);
  }

  return (
    <div className="bg-white shadow-2xl shadow-black-light/5 rounded-3xl p-4 grid gap-4">
      {isError && <ErrorMessage message="¡Ups! Ha ocurrido un error" />}
      {isLoading && (
        <div
          role="status"
          className="animate-pulse flex justify-center flex-wrap gap-1"
        >
          <div className="h-32 w-32 p-2 rounded-full shadow bg-black-light/30"></div>
          <div className="rounded-full bg-black-light/30 w-full mb-4 mt-2 h-[34px]"></div>
          <div className="h-7 rounded-full bg-black-light/30 w-full"></div>
          <div className="h-5 rounded-full bg-black-light/30 w-full"></div>
          <div className="h-5 rounded-full bg-black-light/30 w-full"></div>
          <div className="h-5 rounded-full bg-black-light/30 w-full"></div>
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
              className=" inline-flex gap-2 items-center relative px-4 rounded-full mb-4 mt-2 bg-danger text-white"
            >
              <IoExitOutline className="text-base block flex-grow-0 flex-shrink-0 h-8" />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
            <p className="text-xl text-black font-normal">{data.data.name}</p>
            <p className="text-lg text-center text-black-light">
              {data.data.email}
            </p>
            <p className="text-lg text-center text-black-light inline-flex gap-2 items-center">
              <IoLocationOutline className="text-xl block flex-grow-0 flex-shrink-0 h-8" />
              {data.data.address ?? 'No hay un domicilio registrado'}
            </p>
            <p className="text-lg text-center text-black-light inline-flex gap-2 items-center">
              <IoPhonePortraitOutline className="text-xl block flex-grow-0 flex-shrink-0 h-8" />
              {data.data.phone ?? 'No hay un número registrado'}
            </p>
          </div>
          {!data?.data.phone || !data?.data.address ? (
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="grid gap-2 mt-2 relative"
            >
              <ErrorMessage message="Hacen falta algunos datos" />
              {isUpdating && <Spinner />}
              {!data?.data.address && (
                <input
                  type="text"
                  placeholder="Domicilio"
                  className="w-full rounded-lg py-3 px-4 bg-background appearance-none rounded-tg placeholder:text-black-light"
                  {...register('address')}
                />
              )}
              {!data?.data.phone && (
                <input
                  type="tel"
                  inputMode="decimal"
                  autoComplete="tel"
                  placeholder="Número de teléfono"
                  className="w-full rounded-lg py-3 px-4 bg-background appearance-none rounded-tg placeholder:text-black-light"
                  {...register('phone')}
                />
              )}
              {!data?.data.phone || !data?.data.address ? (
                <button
                  className="w-full gap-2 relative py-3 px-4 rounded-full shadow-lg bg-apricot text-white text-center"
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
