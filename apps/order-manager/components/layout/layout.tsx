import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Navigation, TopBar, LoginCard } from '../';
import Seo from '../seo/seo';
import Spinner from '../spinner/spinner';
/* eslint-disable-next-line */
export interface LayoutProps {
  children: React.ReactElement;
}

export function Layout(props: LayoutProps) {
  const { status } = useSession();
  const { pathname } = useRouter();

  if (status === 'loading') {
    return <Spinner />;
  } else if (status === 'unauthenticated') {
    return (
      <>
        <Seo />
        <main className="min-h-screen bg-background relative">
          <LoginCard />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Seo />
        <main className="bg-background min-h-screen relative pb-[4rem]">
          {pathname !== '/perfil' && (
            <>
              <Navigation />
              <TopBar />
            </>
          )}
          <section className="p-4 container mx-auto">{props.children}</section>
        </main>
      </>
    );
  }
}

export default Layout;
