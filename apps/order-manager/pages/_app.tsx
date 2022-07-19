import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import './styles.css';
import { Layout } from './../components';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default CustomApp;
