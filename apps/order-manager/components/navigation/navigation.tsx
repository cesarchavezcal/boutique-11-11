import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const router = useRouter();
  const { data } = useSession();

  return (
    <nav className="bg-white w-full flex shadow justify-between items-center px-4 h-16 sticky top-0 z-10">
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
        {router.route.toString() !== '/order' && data ? (
          <Link href={'/order'}>
            <a className="inline-flex gap-2 items-center relative px-4 py-2 border rounded-full shadow-lg bg-rose-500 text-white">
              <span className="text-sm">Hacer Pedido</span>
              <IoBagHandleOutline />
            </a>
          </Link>
        ) : (
          <></>
        )}
      </section>
    </nav>
  );
}

export default Navigation;
