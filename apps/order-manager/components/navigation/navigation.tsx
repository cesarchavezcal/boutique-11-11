import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { MdAccountCircle } from 'react-icons/md';
/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const { data, status } = useSession();
  return (
    <nav className="bg-white w-full flex relative shadow justify-between items-center px-4 h-16">
      <Link href={'/'}>
        <h1>11:11</h1>
      </Link>
      <section className="flex-initial">
        {!data ? (
          <button
            onClick={() => signIn()}
            className="inline-flex gap-2 items-center relative px-2 border rounded-full hover:shadow-lg transition-shadow"
          >
            <MdAccountCircle className="text-2xl block flex-grow-0 flex-shrink-0 h-10" />
            <span className="text-sm">Iniciar Sesión</span>
          </button>
        ) : (
          <Link href={'/profile'}>
            <a className="inline-flex gap-2 items-center relative p-2 border rounded-full hover:shadow-lg transition-shadow">
              <span className="text-sm">Mi Perfil</span>
              <figure className="aspect-square w-6 h-6 relative rounded-full">
                <Image
                  src={data.user.image}
                  className="rounded-full"
                  width={24}
                  height={24}
                  layout="fill"
                  alt={data.user.name}
                ></Image>
              </figure>
            </a>
          </Link>
        )}
      </section>
    </nav>
  );
}

export default Navigation;
