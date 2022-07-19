import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
/* eslint-disable-next-line */
export interface LoginCardProps {}

export function LoginCard(props: LoginCardProps) {
  return (
    <section className="w-full grid gap-4 bg-white shadow rounded-lg p-10 justify-center h-fit">
      <figure className="mx-auto aspect-square">
        <Image
          src={'/images/brand.png'}
          height={80}
          width={80}
          alt="11:11 Branding"
          priority
        ></Image>
      </figure>
      <article className="flex flex-wrap gap-2 justify-center">
        <h1 className="text-2xl font-light text-center text-rose-700">
          ¡Bienvenidx!
        </h1>
        <p className="text-sm font-semibold text-center text-gray-600">
          Para crear un pedido inicia sesión con tu cuenta de Facebook
        </p>
        <button
          onClick={() => signIn('facebook')}
          className="bg-[#3578E5] text-white inline-flex gap-2 items-center relative px-4 border rounded-full mt-2"
        >
          <FaFacebook className="text-white text-2xl block flex-grow-0 flex-shrink-0 h-10" />
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
  );
}

export default LoginCard;
