import Image from 'next/image';
import Link from 'next/link';
Image;
import { ReactNode } from 'react';
import {
  IoStorefrontOutline,
  IoHomeOutline,
  IoBagHandleOutline,
} from 'react-icons/io5';

/* eslint-disable-next-line */
export interface AdminNavigationProps {}

type NavigationItem = {
  href: string;
  icon: ReactNode;
  label: string;
};

export function AdminNavigation(props: AdminNavigationProps) {
  const navigation: NavigationItem[] = [
    {
      href: '/admin',
      icon: <IoHomeOutline className="text-black-light mx-auto text-2xl" />,
      label: 'Inicio',
    },
    {
      href: '/admin/ordenes',
      icon: (
        <IoBagHandleOutline className="text-black-light mx-auto text-2xl" />
      ),
      label: 'Ordenes',
    },
    {
      href: '/',
      icon: (
        <IoStorefrontOutline className="text-black-light mx-auto text-2xl" />
      ),
      label: 'Tienda',
    },
  ];
  return (
    <nav className="flex min-h-screen w-max flex-col p-4 shadow">
      <figure className="mx-auto mb-6 aspect-square h-14 w-14">
        <Image
          src={'/images/brand.png'}
          height={80}
          width={80}
          alt="11:11 Branding"
          priority
        ></Image>
      </figure>
      {navigation.map((item, i) => {
        return (
          <Link href={item.href} key={i}>
            <a className="border-black-light/10 inline-grid h-16 w-16 place-content-center border-b">
              <i className="text-center">{item.icon}</i>
              <small className="text-black-light">{item.label}</small>
            </a>
          </Link>
        );
      })}
    </nav>
  );
}

export default AdminNavigation;
