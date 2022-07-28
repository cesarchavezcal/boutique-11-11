import { IoChevronBackCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
/* eslint-disable-next-line */
export interface TopNavBarProps {
  url: string;
  page: string;
}

export function TopNavBar(props: TopNavBarProps) {
  return (
    <section className="fixed top-0 left-0 z-50 flex w-full items-center bg-white/70 p-4 backdrop-blur-md">
      <Link href={props.url}>
        <p className="inline-flex items-center gap-2 text-base text-black">
          <IoChevronBackCircleOutline className="text-apricot text-3xl" />
          Regresar a {props.page}
        </p>
      </Link>
    </section>
  );
}

export default TopNavBar;
