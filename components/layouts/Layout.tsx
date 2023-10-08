import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';
import { useRouter } from 'next/router';

type Layout = {
  children: ReactNode;
  title?: string;
};

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Layout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Igor' />
        <meta
          name='description'
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta
          name='keywords'
          content={`${title}, pokemon, pokedex, pokemon-app`}
        />
        <meta property='og:title' content={`Information about ${title}`} />
        <meta
          property='og:description'
          content={`This is the description page of the pokemon ${title}`}
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main className='py-5 px-5'>{children}</main>
    </>
  );
};
