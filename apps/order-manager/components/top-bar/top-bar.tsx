import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface TopBarProps {}

export function TopBar(props: TopBarProps) {
  const { data } = useSession();

  return (
    <section className="sticky top-0 p-4 left-0 backdrop-blur-md bg-white/70 z-50">
      <section className="flex justify-between">
        <Link href={'/perfil'}>
          <a className="flex gap-2 items-center">
            <Image
              src={data.user?.image}
              alt={data.user?.name}
              width={48}
              height={48}
              className="rounded-full aspect-square"
            />
            <section className="flex-grow flex items-center flex-wrap">
              <p className="text-base text-black block w-full leading-none">
                {data.user?.name}
              </p>
              <small className="text-base text-apricot">Ver mi perfil</small>
            </section>
          </a>
        </Link>
      </section>
    </section>
  );
}

export default TopBar;
