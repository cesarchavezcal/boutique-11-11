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
        <a className="inline-flex items-center gap-2 rounded text-base text-black hover:bg-black/5">
          <IoChevronBackCircleOutline className="text-apricot text-3xl" />
          Regresar a {props.page}
        </a>
      </Link>
    </section>
  );
}

export default TopNavBar;
