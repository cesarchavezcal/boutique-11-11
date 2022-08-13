import Link from 'next/link';
import {
  IoHelpCircleOutline,
  IoHomeOutline,
  IoBagHandleOutline,
} from 'react-icons/io5';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const router = useRouter();
  const activeLink = 'text-apricot';

  return (
    <nav className="inset-y fixed bottom-0 left-0 z-50 flex w-full justify-around bg-white/70 backdrop-blur-md">
      <Link href={'/'}>
        <a
          className={`grid h-16 w-[calc(100%/3)] place-content-center gap-1 ${
            router.pathname === '/' ? activeLink : 'text-black-light'
          }`}
        >
          <IoHomeOutline className="mx-auto text-2xl" />
          <small>Inicio</small>
        </a>
      </Link>
      <Link href={'/ordenes'}>
        <a
          className={`bg-apricot grid h-16 w-[calc(100%/3)] place-content-center gap-1 rounded px-2 text-white ${
            router.pathname === '/ordenes' ? 'bg-apricot' : 'bg-apricot-light'
          }`}
        >
          <IoBagHandleOutline className="mx-auto  text-2xl" />
          <small>Hacer Orden</small>
        </a>
      </Link>
      <Link href={'/ayuda'}>
        <a
          className={`grid h-16 w-[calc(100%/3)] place-content-center gap-1 ${
            router.pathname === '/ayuda' ? activeLink : 'text-black-light'
          }`}
        >
          <IoHelpCircleOutline className="mx-auto  text-2xl" />
          <small>Ayuda</small>
        </a>
      </Link>
    </nav>
  );
}

export default Navigation;
