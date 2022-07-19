import styles from './layout.module.css';
import Head from 'next/head';
import Navigation from '../navigation/navigation';
/* eslint-disable-next-line */
export interface LayoutProps {
  children: React.ReactElement;
}

export function Layout(props: LayoutProps) {
  return (
    <>
      <Head>
        <title>11:11 Boutique</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💄</text></svg>"
        />
      </Head>
      <main className="min-h-screen bg-gray-100 relative">
        <Navigation />
        {props.children}
      </main>
    </>
  );
}

export default Layout;
