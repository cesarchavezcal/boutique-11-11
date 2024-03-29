import Head from 'next/head';

/* eslint-disable-next-line */
export interface SeoProps {}

export function Seo(props: SeoProps) {
  return (
    <Head>
      <title>11:11 Boutique</title>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💄</text></svg>"
      />
    </Head>
  );
}

export default Seo;
