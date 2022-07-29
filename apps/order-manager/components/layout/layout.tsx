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
  const style = {
    '--hero-bg': 'url(/images/bg.png)',
  } as React.CSSProperties;

  const { status } = useSession();
  const { pathname } = useRouter();

  if (status === 'loading') {
    return <Spinner />;
  } else if (status === 'unauthenticated') {
    return (
      <>
        <Seo />
        <main
          style={style}
          className="bg-background relative min-h-screen bg-[image:var(--hero-bg)] bg-contain bg-fixed bg-right-bottom bg-no-repeat"
        >
          <LoginCard />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Seo />
        <main
          style={style}
          className="bg-background relative min-h-screen bg-[image:var(--hero-bg)] bg-contain bg-fixed bg-right-bottom bg-no-repeat pb-[4rem]"
        >
          {pathname !== '/perfil' && (
            <>
              <Navigation />
              <TopBar />
            </>
          )}
          <section className="container mx-auto p-4">{props.children}</section>
        </main>
      </>
    );
  }
}

export default Layout;
