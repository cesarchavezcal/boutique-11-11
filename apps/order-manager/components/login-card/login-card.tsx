import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
/* eslint-disable-next-line */
export interface LoginCardProps {}

export function LoginCard(props: LoginCardProps) {
  return (
    <section className="grid min-h-screen place-content-center p-4">
      <section className="shadow-black-light/5 grid h-fit w-full justify-center gap-4 rounded-3xl bg-white p-10 shadow-2xl">
        <figure className="mx-auto aspect-square">
          <Image
            src={'/images/brand.png'}
            height={80}
            width={80}
            alt="11:11 Branding"
            priority
          ></Image>
        </figure>
        <article className="flex flex-wrap justify-center gap-2">
          <h1 className="text-center text-2xl font-medium text-black">
            ¡Bienvenida!
          </h1>
          <p className="font-regular text-black-light text-center text-sm">
            Para crear un pedido inicia sesión con tu cuenta de Facebook
          </p>
          <button
            onClick={() => signIn('facebook')}
            className="relative mt-2 inline-flex items-center gap-2 rounded-full border bg-[#3578E5] px-4 text-white"
          >
            <FaFacebook className="block h-10 flex-shrink-0 flex-grow-0 text-2xl text-white" />
            <span className="text-sm">Iniciar Sesión</span>
          </button>
        </article>
        <figure>
          <Image
            src={'/images/no-user.png'}
            height={240}
            width={370}
            alt="Ilustración de inicio de sesion"
          ></Image>
        </figure>
      </section>
    </section>
  );
}

export default LoginCard;
