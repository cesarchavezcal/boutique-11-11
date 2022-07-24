import styles from './top-nav-bar.module.css';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
/* eslint-disable-next-line */
export interface TopNavBarProps {
  url: string;
  page: string;
}

export function TopNavBar(props: TopNavBarProps) {
  return (
    <section className="fixed w-full top-0 p-4 left-0 backdrop-blur-md bg-white/70 z-50 flex items-center">
      <Link href={props.url}>
        <p className="inline-flex gap-2 items-center text-base text-black">
          <IoChevronBackCircleOutline className="text-3xl text-apricot" />
          Regresar a {props.page}
        </p>
      </Link>
    </section>
  );
}

export default TopNavBar;
