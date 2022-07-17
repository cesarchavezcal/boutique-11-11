import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { MdAccountCircle } from 'react-icons/md';
import { IoBagHandleOutline } from 'react-icons/io5';
/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const { data, status } = useSession();
  return (
    <nav className="bg-white w-full flex relative shadow justify-between items-center px-4 h-16">
      <Link href={'/'}>
        <figure className="h-12 w-12">
          <Image
            src={'/images/brand.png'}
            height={48}
            width={48}
            alt="11:11 Branding"
          ></Image>
        </figure>
      </Link>
      <section className="flex-initial">
        {data && (
          <Link href={'/order'}>
            <a className="inline-flex gap-2 items-center relative px-4 py-2 border rounded-full shadow-lg bg-rose-500 text-white">
              <span className="text-sm">Hacer Pedido</span>
              <IoBagHandleOutline />
            </a>
          </Link>
        )}
      </section>
    </nav>
  );
}

export default Navigation;
