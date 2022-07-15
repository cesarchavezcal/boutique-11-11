import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import './styles.css';
import { Layout } from '../components';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default CustomApp;
