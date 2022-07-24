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
    <nav className="bg-white w-full fixed inset-y bottom-0 left-0 flex justify-around rounded-t-3xl ">
      <Link href={'/'}>
        <a
          className={`h-16 w-[calc(100%/3)] grid gap-1 place-content-center ${
            router.pathname === '/' ? activeLink : 'text-black-light'
          }`}
        >
          <IoHomeOutline className="text-2xl  mx-auto" />
          <small>Inicio</small>
        </a>
      </Link>
      <Link href={'/ordenes'}>
        <a
          className={`h-16 px-2 w-[calc(100%/3)] grid gap-1 place-content-center bg-apricot text-white rounded ${
            router.pathname === '/ordenes' ? 'bg-apricot' : 'bg-apricot-light'
          }`}
        >
          <IoBagHandleOutline className="text-2xl  mx-auto" />
          <small>Hacer Orden</small>
        </a>
      </Link>
      <Link href={'/ayuda'}>
        <a
          className={`h-16 w-[calc(100%/3)] grid gap-1 place-content-center ${
            router.pathname === '/ayuda' ? activeLink : 'text-black-light'
          }`}
        >
          <IoHelpCircleOutline className="text-2xl  mx-auto" />
          <small>Ayuda</small>
        </a>
      </Link>
    </nav>
  );
}

export default Navigation;
