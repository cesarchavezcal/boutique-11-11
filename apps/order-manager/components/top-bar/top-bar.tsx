import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface TopBarProps {}

export function TopBar(props: TopBarProps) {
  const { data } = useSession();

  return (
    <section className="sticky top-0 left-0 z-50 bg-white/70 p-4 backdrop-blur-md">
      <section className="flex justify-between">
        <Link href={'/perfil'}>
          <a className="flex items-center gap-2">
            <Image
              src={data.user?.image}
              alt={data.user?.name}
              width={48}
              height={48}
              className="aspect-square rounded-full"
            />
            <section className="flex flex-grow flex-wrap items-center">
              <p className="block w-full text-base leading-none text-black">
                {data.user?.name}
              </p>
              <small className="text-apricot text-base">Ver mi perfil</small>
            </section>
          </a>
        </Link>
      </section>
    </section>
  );
}

export default TopBar;
